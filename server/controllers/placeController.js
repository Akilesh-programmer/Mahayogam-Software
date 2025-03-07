const Place = require('../models/Place');

exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching places' });
  }
};

exports.addPlace = async (req, res) => {
  try {
    const { place } = req.body;
    const newPlace = new Place({ place });
    await newPlace.save();
    res
      .status(201)
      .json({ message: 'Place added successfully', place: newPlace });
  } catch (error) {
    res.status(500).json({ error: 'Error adding place' });
  }
};
