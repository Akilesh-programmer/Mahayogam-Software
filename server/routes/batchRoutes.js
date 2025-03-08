const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const { authenticateUser } = require('../Middleware/authMiddleware');

router.get('/:placeId', authenticateUser, batchController.getBatchesByPlace);
router.post('/', authenticateUser, batchController.addBatch);

module.exports = router;
