const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'time_trackerElectronApp'
const commonErrorHandler = require('../common/common');


const UserController = {
    registerUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        try {
            // User already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) return res.status(400).json({ error: 'Email is already registered' })

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({ 
                email: req.body.email,
                password: hashedPassword,
                contactNumber: req.body.contactNumber 
            });

            return res.status(201).json({ message: 'User registered successfully', data: newUser })
        } catch (error) {
            commonErrorHandler(error, res);
        }
    },

    loginUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(401).json({ error: 'Invalid email or password' })

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password' })

            const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '300d' })

            return res.status(200).json({ token: token, userId: user._id })
        } catch (error) {
            commonErrorHandler(error, res);
        }
    }
}

module.exports = UserController;
