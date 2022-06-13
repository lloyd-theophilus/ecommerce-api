const { query } = require("express");
const Product = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// Post request to create a product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  }
  catch (err) {
    res.status(400).json({ message: 'You cannot create a new product at this time' });
  }
  
 });












module.exports = router;