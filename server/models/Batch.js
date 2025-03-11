const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

BatchSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Batch', BatchSchema);
