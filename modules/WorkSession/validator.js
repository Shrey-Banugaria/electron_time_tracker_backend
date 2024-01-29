const { body } = require('express-validator');

const validator = {}

validator.add = [
    body('startTime').isISO8601(),
    body('endTime').isISO8601(),
    body('breakDuration').isNumeric(),
    body('date').isISO8601(),
]

validator.getMonthSessions = [
    body('targetMonth').is,
]

module.exports = validator