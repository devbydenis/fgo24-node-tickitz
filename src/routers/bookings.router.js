const bookingRouter = require('express').Router()
const bookingController = require('../controllers/booking.controller')

bookingRouter.get('/', bookingController.getAllMovies)
bookingRouter.get('/now-playing', bookingController.getNowPlaying)
bookingRouter.get('/search', bookingController.searchMovies) //query param
bookingRouter.get('/:id', bookingController.getMovieById)
bookingRouter.get('/genre/:genre', bookingController.getMoviesByGenre)

module.exports = bookingRouter
