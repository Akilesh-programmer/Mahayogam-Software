const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  place: { type: String, required: true, unique: true},
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }]
});

PlaceSchema.index({ place: 1 }, { unique: true });

module.exports = mongoose.model('Place', PlaceSchema);
