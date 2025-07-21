const routers = require('express').Router()

routers.use('/auth', require('./auth.router'))
routers.use('/movies', require('./movies.router'))
routers.use('/bookings', require('./bookings.router'))

module.exports = routers