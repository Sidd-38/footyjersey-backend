const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already registered' });

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json(user);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json(user);
});

module.exports = router;
