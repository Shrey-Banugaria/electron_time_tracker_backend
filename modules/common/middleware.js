const jwt = require('jsonwebtoken');
const User = require('../Users/model');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'time_trackerElectronApp'


module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(200).json({ error: 'Unauthorized - No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized - Invalid user' });

    req.user = user
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
