const express = require("express");
const Order = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// Post request to create an order
router.post("/", verifyToken, async (req, res) => { 
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: "You cannot create an oder at this time" }); 
    }
})

// Put request to updat order status
router.put("/:id", verifyTokenAndAdmin, async (req, res) => { 
  try {
   const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: "You cannot update the order at this time" });
  }
})

// Delete request to delete a product from the cart
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
   await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Item has been deleted successfully');
  } catch (error) {
    res.status(404).json({ message: "Item not found" });
  }
});

// Get request to get user Orders by id (Accessed by the admin and the user)
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => { 
  try {
    const orders = await Order.find({ _id: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: "Item not found" });
  }
})

// Get request to access all products in the cart (Accessed by the admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => { 
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
    }
})

// Get monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    
    try {
        const income = await Order.aggregate([  // Aggregate to get the total income of the last month
            { $match: { createdAt: { $gte: previousMonth } } },
            
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
                {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            }
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(404).json({ message: "Item not found" });
     }
})

 
module.exports = router;