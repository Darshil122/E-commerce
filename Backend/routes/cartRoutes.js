const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// GET user cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

// ADD product to cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [{ ...product, quantity: 1 }] });
  } else {
    const existing = cart.items.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
});

// REMOVE product
router.delete("/remove/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter((item) => item._id !== productId);
    await cart.save();
    res.json({ cart });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

// UPDATE quantity
router.patch("/update/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { delta } = req.body;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    const item = cart.items.find((i) => i._id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      await cart.save();
      res.json({ cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

// CLEAR cart
router.delete("/clear/:userId", async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.params.userId });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
