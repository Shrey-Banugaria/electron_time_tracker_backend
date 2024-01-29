const express = require('express');
const router = express.Router();
const DailySummary = require('./controller');
// const validator = require('./validator');
const authMiddleware = require('../common/middleware');

router.use(authMiddleware);
router.post('/add', DailySummary.addDailySummary);
router.get('/user/:userId', DailySummary.getDailySummaries);

module.exports = router;
