const Batch = require('../models/Batch');
const Place = require('../models/Place');

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
