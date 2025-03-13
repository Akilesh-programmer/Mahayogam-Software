const mongoose = require('mongoose');

const BatchAttendanceDatesSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true,
    unique: true,
  },
  dates: [{ type: Date }],
});

const BatchAttendanceDates = mongoose.model(
  'BatchAttendanceDates',
  BatchAttendanceDatesSchema
);

module.exports = BatchAttendanceDates;
