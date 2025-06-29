const express = require("express");
const Product = require("../models/Products");
const router = express.Router();
const {
  getProducts,
  addToProduct,
  deleteProduct,
} = require("../controller/product");

router.route("/").get(getProducts).post(addToProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;
