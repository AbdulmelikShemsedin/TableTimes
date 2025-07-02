const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  location: String,
  category: String, // e.g. 'Italian', 'Ethiopian', 'Chinese'
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
