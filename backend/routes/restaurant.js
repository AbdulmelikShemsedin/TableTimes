const express = require('express');
const { protect, isOwner } = require('../middleware/authMiddleware');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Create restaurant
router.post('/', protect, isOwner, async (req, res) => {
  const restaurant = await Restaurant.create({ ...req.body, owner: req.user.id });
  res.status(201).json(restaurant);
});

// Get my restaurant
router.get('/me', protect, isOwner, async (req, res) => {
  const restaurant = await Restaurant.findOne({ owner: req.user.id });
  res.json(restaurant);
});

// Update restaurant
router.put('/:id', protect, isOwner, async (req, res) => {
  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json(restaurant);
});

// Delete restaurant
router.delete('/:id', protect, isOwner, async (req, res) => {
  await Restaurant.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
