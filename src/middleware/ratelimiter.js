const rateLimit = require('express-rate-limit');

// Rate limiting (5 requests per hour per IP)
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many password reset requests, please try again later'
});

module.exports = rateLimiter;