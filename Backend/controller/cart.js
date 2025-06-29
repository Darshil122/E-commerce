const Cart = require("../models/Cart");

async function getCart(req, res) {
  const { userId } = req.params;

  try {
    const userCart = await Cart.findOne({ userId }).populate("items.product");

    if (!userCart) {
      return res.json([]);
    }

    const formattedItems = userCart.items.map((item) => ({
      _id: item.product._id,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addItemToCart(req, res) {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId required" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: error.message });
  }
}

async function updateCart(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    const formattedItems = cart.items.map((item) => ({
      _id: item.product._id,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    res.json({ items: formattedItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeItem(req, res) {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function cleraCart(req, res) {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully", items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
  getCart,
  addItemToCart,
  updateCart,
  removeItem,
  cleraCart,
};
