const { body } = require('express-validator');

const UserValidator = {}

UserValidator.registerUser = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
]

UserValidator.loginUser = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
]

module.exports = UserValidator