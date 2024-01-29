const WorkSession = require('./model')
const { validationResult } = require('express-validator')
const { commonErrorHandler, formatMilliseconds } = require('../common/common');

const WorkSessionController = {
  addWorkSession: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { startTime, endTime, breakDuration, workDuration, date } = req.body

    try {
        const newWorkSession = await WorkSession.create({
            userId: req.user._id,
            startTime,
            endTime,
            breakDuration,
            workDuration,
            date
        })

        return res.status(201).json({ message: 'Work session added successfully', data: {} })
    } catch (error) {
        commonErrorHandler(error, res);
    }
  },
  getWorkSessions: async (req, res, next) => {
    try {
        const workSessions = await WorkSession.find({ userId: req.user._id })
        return res.status(200).json(workSessions);
    } catch (error) {
        commonErrorHandler(error, res);
    }
  },
  
  monthlyWorkSession: async (req, res, next) => {
    const userId = req.user._id;
    const targetMonth = req.body.targetMonth;

    WorkSession.aggregate([
        {
            $match: {
            userId: userId,
            date: {
                $gte: new Date(targetMonth + "-01"),
                $lt: new Date(targetMonth + "-31"),
            },
            },
        },
        {
            $group: {
            _id: null,
            totalWorkDuration: { $sum: "$breakDuration" },
            },
        },
    ])
        .exec()
        .then((result) => {
            const totalWorkingTimeInMonth = result.length > 0 ? result[0].totalWorkDuration : 0;
            return res.status(200).json(totalWorkingTimeInMonth);
        })
        .catch((error) => {
            console.error(error);
            commonErrorHandler(error, res);
        });
  },
}

module.exports = WorkSessionController
