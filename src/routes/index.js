const { routesFromProduct } = require('./products.routes')
const { routesFromUser } = require('./users.routes')
const { routesFromCart } = require('./carts.routes'); 
const {Router} = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromUser(),
    routesFromProduct(),
    routesFromCart(),
])

module.exports = routes