const User = require('../models/user');

exports.checkAdmin = async (req, res, next) => {
  // Assume req.userId is set by authentication middleware
  const user = await User.findById(req.userId);
  if (user && user.role === 'Admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admins only' });
};