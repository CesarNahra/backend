const {INTEGER} = require('sequelize')
const {connection} = require('../database/connection')

const ProductCart = connection.define('productCarts', {
    cartId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'carts',
            }
        }
    },
    productId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'products',
            }
        }
    },
}, {underscored: true, paranoid: true})


module.exports = {ProductCart}