const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  place: { type: String, required: true, unique: true},
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }]
});

module.exports = mongoose.model('Place', PlaceSchema);
