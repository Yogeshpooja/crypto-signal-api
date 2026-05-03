const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  type: { type: String, enum: ['BUY', 'SELL'], required: true },
  entryPrice: { type: Number, required: true },
  targetPrice: { type: Number, required: true },
  stopLoss: { type: Number, required: true },
  status: { type: String, enum: ['active', 'executed', 'expired'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Signal', signalSchema);
