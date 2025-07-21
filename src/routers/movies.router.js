const movieRouter = require('express').Router()
const movieController = require('../controllers/movie.controller')

movieRouter.get('/', movieController.getAllMovies)
movieRouter.get('/now-playing', movieController.getNowPlaying)
movieRouter.get('/search', movieController.searchMovies) //query param
movieRouter.get('/:id', movieController.getMovieById)
movieRouter.get('/genre/:genre', movieController.getMoviesByGenre)

module.exports = movieRouter
