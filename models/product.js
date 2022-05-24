const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Array },
    size: { type: String},
    color: { type: String },
    price: { type: Number, required: true },
    
    stock: { type: Number, required: true },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Product", productSchema);