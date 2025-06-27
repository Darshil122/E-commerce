const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);