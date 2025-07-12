const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  shipping: Object,
  payment: Object,
  subtotal: Number,
  shippingCost: Number,
  tax: Number,
  total: Number,
  status: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);