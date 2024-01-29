const DailySummary = require('../models/dailySummary');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const commonErrorHandler = require('../common/common');


const DailySummary = {
    addDailySummary: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
      
        try {
          const user = await User.findById(req.user._id)
          if (!user) return res.status(404).json({ error: 'User not found' })
      
          const newDailySummary = await DailySummary.create({
            userId: req.user._id,
            date: req.body.date,
            totalWorkDuration: req.body.totalWorkDuration,
            totalBreakDuration: req.body.totalBreakDuration,
          })  
          return res.status(201).json({ message: 'Daily summary added successfully', data: newDailySummary })
        } catch (error) {
            commonErrorHandler(error, res)
        }
    },

    getDailySummaries: async (req, res, next) => {
        try {
          const dailySummaries = await DailySummary.find({ userId: req.user._id });
      
          return res.status(200).json(dailySummaries);
        } catch (error) {
            commonErrorHandler(error, res)
        }
    }

}

module.exports = DailySummary
