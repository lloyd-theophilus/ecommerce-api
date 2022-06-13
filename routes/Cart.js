const express = require("express");
const Cart = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// Post request to add a product to the cart
router.post("/", verifyToken, async (req, res) => { 
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: "You cannot add a new cart at this time" }); 
    }
})

// Put request to update a product in the cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => { 
  try {
   const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(404).json({ message: "You cannot update the cart at this time" });
  }
})

// Delete request to delete a product from the cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
   await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Item has been deleted successfully');
  } catch (error) {
    res.status(404).json({ message: "Item not found" });
  }
});

// Get request to get user Cart by id (Accessed by the admin and the user)
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => { 
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: "Item not found" });
  }
})

// Get request to access all products in the cart (Accessed by the admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => { 
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
    }
})

module.exports = router;