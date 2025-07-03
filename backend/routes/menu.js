const express = require('express');
const { protect, isOwner } = require('../middleware/authMiddleware');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Create menu item (must belong to owner’s restaurant)
router.post('/', protect, isOwner, async (req, res) => {
  const { restaurantId, ...itemData } = req.body;

  const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.user.id });
  if (!restaurant) return res.status(403).json({ message: 'Unauthorized restaurant access' });

  const item = await MenuItem.create({ restaurant: restaurantId, ...itemData });
  res.status(201).json(item);
});

// Get menu items for a restaurant (public)
router.get('/:restaurantId', async (req, res) => {
  const items = await MenuItem.find({ restaurant: req.params.restaurantId });
  res.json(items);
});

// Update menu item
router.put('/:id', protect, isOwner, async (req, res) => {
  const item = await MenuItem.findById(req.params.id).populate('restaurant');
  if (!item || item.restaurant.owner.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  Object.assign(item, req.body);
  await item.save();
  res.json(item);
});

// Delete menu item
router.delete('/:id', protect, isOwner, async (req, res) => {
  const item = await MenuItem.findById(req.params.id).populate('restaurant');
  if (!item || item.restaurant.owner.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  await item.remove();
  res.json({ message: 'Item removed' });
});

module.exports = router;
