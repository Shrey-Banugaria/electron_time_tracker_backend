const express = require('express');
const router = express.Router();
const WorkSessionController = require('./controller');
const validator = require('./validator');
const authMiddleware = require('../common/middleware');


router.use(authMiddleware);
router.post('/add', WorkSessionController.addWorkSession);
router.get('/get-user-worksession', WorkSessionController.getWorkSessions);
router.get('/monthly-session', WorkSessionController.monthlyWorkSession);

module.exports = router;
