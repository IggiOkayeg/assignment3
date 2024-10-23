const mongoose = require('mongoose');

const storageOfferingSchema = new mongoose.Schema({
  offeringId: { type: Number, required: true, unique: true }, 
  provider: { type: String, required: true }, 
  capacity: { type: Number, required: true },
  pricePerGBPerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('StorageOffering', storageOfferingSchema);
