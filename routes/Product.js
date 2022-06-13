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
 
// Put request to update a product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => { 
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: "Product has been updated successfully" });
  }
})

// Delete request to delete a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
   await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted successfully');
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});
 
// Get request to get a product by id (Accessed by everyone)
router.get("/find/:id", async (req, res) => { 
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
   })








module.exports = router;