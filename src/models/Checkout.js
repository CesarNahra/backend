const {INTEGER, STRING, BOOLEAN} = require('sequelize')
const {connection} = require('../database/connection')
const { Cart } = require('./Cart')

const Checkout = connection.define('checkout', {
    checkoutId: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cartId: {
        type: INTEGER,
        references: {
            model: {
                tableName: 'carts',
            }
        }
    },
    status: {
        type: BOOLEAN,
        allowNull: false
    },
    type: STRING,
}, {underscored: true, paranoid: true})

Checkout.belongsTo(Cart, {foreignKey: 'cart_id'})
Cart.hasOne(Checkout, {foreignKey: 'cart_id'})


module.exports = {Checkout}