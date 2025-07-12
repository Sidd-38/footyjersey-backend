const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place order
router.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// Get orders by user
router.get('/user/:id/orders', async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  res.json(orders);
});

module.exports = router;
