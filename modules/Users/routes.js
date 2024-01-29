const express = require('express');
const router = express.Router();
const userController = require('./controller');
const userValidator = require('./validator');


router.post('/register', userValidator.registerUser, userController.registerUser);
router.post('/login', userValidator.loginUser, userController.loginUser);

module.exports = router;
