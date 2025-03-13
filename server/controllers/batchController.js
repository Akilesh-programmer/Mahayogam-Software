const Batch = require('../models/Batch');
const Place = require('../models/Place');
const Student = require('../models/Student');

exports.getBatchesByPlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    const place = await Place.findById(placeId).populate('batches');
    if (!place) return res.status(404).json({ error: 'Place not found' });

    res.status(200).json(place.batches);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching batches' });
  }
};

exports.getStudentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    // Find batch and populate students
    const batch = await Batch.findById(batchId).populate('students');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json(batch.students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addBatch = async (req, res) => {
  try {
    const { placeId, name } = req.body;
    const place = await Place.findById(placeId);
    if (!place) return res.status(404).json({ error: 'Place not found' });

    const newBatch = new Batch({ name });
    await newBatch.save();

    place.batches.push(newBatch._id);
    await place.save();

    res
      .status(201)
      .json({ message: 'Batch added successfully', batch: newBatch });
  } catch (error) {
    res.status(500).json({ error: 'Error adding batch' });
  }
};
