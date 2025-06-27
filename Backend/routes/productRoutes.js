const express = require("express");
const Product = require("../models/Products");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.json(newProduct);
  if (newProduct) {
    return res
      .status(201)
      .json({ message: "New Product Added", product: newProduct });
  } else {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await Product.findOneAndDelete({ id: req.params.id });
  if (deleted) {
    return res.json({ message: "Product deleted" });
  }
});

module.exports = router;