const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/', authenticateUser, placeController.getAllPlaces);
router.post('/', authenticateUser, placeController.addPlace);

module.exports = router;
