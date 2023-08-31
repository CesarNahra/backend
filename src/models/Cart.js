const {INTEGER, STRING, NUMBER, BOOLEAN } = require('sequelize')
const {connection} = require('../database/connection')
const { Product } = require('./Product')
const { ProductCart } = require('./ProductCart')

const Cart = connection.define('carts', {
    cartId: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'users',
            }
        }
    },
    price: {
        type: NUMBER(2),
        allowNull: false,
    },
    category:{
        type: STRING,
    },
    status: {
        type: BOOLEAN,
    }
}, {underscored: true, paranoid: true})

Product.belongsToMany(Cart, {
    through: ProductCart, foreignKey: 'productId', as: 'carts'
})
Cart.belongsToMany(Product, {
    through: ProductCart, foreignKey: 'cartId', as: 'products'
})

ProductCart.hasMany(Cart, {foreignKey: 'cartId'})

module.exports = {Cart}