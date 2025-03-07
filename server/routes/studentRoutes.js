const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get(
  '/batch/:batchId',
  authenticateUser,
  studentController.getStudentsByBatch
);
router.get(
  '/:studentId',
  authenticateUser,
  studentController.getStudentDetails
);
router.patch('/:studentId', authenticateUser, studentController.updateStudent);
router.post('/', authenticateUser, studentController.addStudent);
router.patch('/feeStatus/:studentId', authenticateUser, studentController.updateFeeStatus);

module.exports = router;
