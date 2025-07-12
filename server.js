const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "https://footyjersey-frontend.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }));  
app.use(express.json());

// Models
const User = require('./models/user');
const Order = require('./models/order');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.post('/api/register', async (req, res) => {
    try {
      console.log("📩 Incoming register request body:", req.body);
      const { name, email, password } = req.body;
  
      const exists = await User.findOne({ email });
      if (exists) {
        console.log("⚠️ Email already registered");
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const user = new User({ name, email, password });
      await user.save();
  
      console.log("✅ User registered:", user.email);
      res.status(201).json(user);
    } catch (err) {
      console.error("❌ Registration error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(user);
});

app.post('/api/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

app.get('/api/user/:id/orders', async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  res.json(orders);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));