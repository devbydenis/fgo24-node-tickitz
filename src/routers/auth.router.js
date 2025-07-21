const authRouter = require('express').Router()
const authController = require('../controllers/auth.controller')
const rateLimiter = require('../middleware/ratelimiter') // limit request forgot-password

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/forgot-password', rateLimiter, authController.forgotPassword)
authRouter.patch('/reset-password', authController.resetPassword)

module.exports = authRouter
