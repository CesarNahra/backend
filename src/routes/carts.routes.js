const {create, findAll, findOne, findAllAdm, remove, restore, buyProduct} = require('../controller/cart.controller')
const {Router} = require('express')
const {auth} = require('../middlewares/auth.middleware');
const {logger} = require('../middlewares/logger.middleware');

class CartRouter{
    routesFromCart() {
        const CartRoutes = Router()
        CartRoutes.post('/carts', auth, create)
        CartRoutes.get('/carts', auth, findAll)
        CartRoutes.get('/carts/:cartId', auth, findOne)
        CartRoutes.get('/cartsAdm/', auth, findAllAdm)
        CartRoutes.delete('/carts/:cartId/remove', auth, remove)
        CartRoutes.post('/carts/:cartId/restore', auth, restore)
        CartRoutes.post('/carts/buy', auth, buyProduct)
        return CartRoutes
    }
}

module.exports = new CartRouter()