const UserRoutes = require('./Users/routes')
const WorkSession = require('./WorkSession/routes')
const express = require('express');
const router = express.Router();

router.use('/user', UserRoutes);
router.use('/work', WorkSession);

module.exports = router;