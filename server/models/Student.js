const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  profile: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  attendanceSummary: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ['Present', 'Absent'], required: true }
    }
  ],
  feeRecords: [
    {
      month: { type: Number, required: true, min: 1, max: 12 }, // 1-12 for Jan-Dec
      year: { type: Number, required: true },
      status: { type: String, enum: ['Paid', 'Unpaid'], required: true }
    }
  ]
});

module.exports = mongoose.model('Student', StudentSchema);
