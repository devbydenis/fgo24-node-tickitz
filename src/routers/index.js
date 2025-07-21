const routers = require('express').Router()

routers.use('/auth', require('./auth.router'))
routers.use('/movies', require('./movies.router'))

module.exports = routers