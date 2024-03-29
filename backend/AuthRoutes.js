const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('./AuthController')


// Registration endpoint mounted with register function invoked from backend
router.post('/register', authController.register);

// Login endpoint
router.post('/login', passport.authenticate('local'), authController.login);

// Logout endpoint
router.get('/logout', authController.logout);

// Session check endpoint
router.get('/sessionCheck', authController.sessionCheck);

module.exports = router; //export my router obj with all these endpoints

