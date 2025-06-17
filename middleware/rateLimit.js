const rateLimit = require('express-rate-limit');


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: {
    status: 429, 
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});


const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 requests per hour per IP
  message: {
    status: 429,
    message: 'Too many attempts from this IP, please try again after an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  strictLimiter
};