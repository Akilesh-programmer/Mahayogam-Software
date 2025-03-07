const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup); // Signup Route
router.post('/login', authController.login); // Login Route

module.exports = router;
