const {create, findAll, findOne, findAllAdm, remove, restore, update} = require('../controller/product.controller')
const {Router} = require('express')
const {auth} = require('../middlewares/auth.middleware');
const {logger} = require('../middlewares/logger.middleware');

class ProductRouter{
    routesFromProduct() {
        const ProductRoutes = Router()
        ProductRoutes.post('/products', auth, create)
        ProductRoutes.get('/products', auth, findAll)
        ProductRoutes.get('/products/:productId', auth, findOne)
        ProductRoutes.get('/productsAdm/', auth, findAllAdm)
        ProductRoutes.delete('/products/:productId/remove', auth, remove)
        ProductRoutes.post('/products/:productId/restore', auth, restore)
        ProductRoutes.patch('/products/:productId/', auth, update)
        return ProductRoutes
    }
}

module.exports = new ProductRouter()