const express = require('express');
const router = express.Router();
const BatchAttendanceDatesController = require('../controllers/BatchAttendanceDatesController');
const { authenticateUser } = require('../Middleware/authMiddleware');

router.get("/:batchId", authenticateUser, BatchAttendanceDatesController.getLatestAttendanceDates);
router.post("/", authenticateUser, BatchAttendanceDatesController.updateAttendance);

module.exports = router;