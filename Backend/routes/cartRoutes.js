const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const router = express.Router();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


router.get("/:userId", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.product");
  res.json(cart || { items: [] });
});


router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product || !product._id) {
    return res.status(400).json({ message: "Missing userId or product._id" });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ product: product._id, quantity: 1 }],
    });
  } else {
    const existingItem = cart.items.find((item) => item.product.toString() === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: product._id, quantity: 1 });
    }
  }

  await cart.save();
  await cart.populate("items.product");
  res.json({ message: "Product added", items: cart.items });
});

router.delete("/remove/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    res.json({ cart });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.patch("/update/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { delta } = req.body;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      await cart.save();
      await cart.populate("items.product");
      res.json({ cart });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.delete("/clear/:userId", async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.params.userId });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
