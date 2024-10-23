// models/StorageAgreement.js
const mongoose = require('mongoose');

const storageAgreementSchema = new mongoose.Schema({
  agreementId: { type: Number, required: true, unique: true },
  consumer: { type: String, required: true },
  provider: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerGBPerDay: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('StorageAgreement', storageAgreementSchema);
