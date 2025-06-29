const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateCart,
  removeItem,
  cleraCart,
} = require("../controller/cart");

router.get("/:userId", getCart);

// POST /cart/add
router.post("/add", addItemToCart);

//PATCH Update quntity
router.patch("/update", updateCart);

// DELETE item remove
router.delete("/remove", removeItem);

// Clear Cart
router.delete("/clear/:userId", cleraCart);

module.exports = router;
