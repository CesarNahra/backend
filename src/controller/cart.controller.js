const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');
const { User } = require('../models/User');

class CartController {
    async create(req, res) {
        try {
            const { userId } = req.body

            const existUser = await User.findByPk(userId)

            if(!existUser) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            const existCart = await Cart.findOne({
                where: {
                    userId:userId,
                    status: true,
                }
            })

            if(existCart) {
                return res.status(403).send({
                    message: 'já existe um carrinho aberto para esse usuário'
                })
            }

            const cartCreated = await Cart.create({
                userId,
                price: 0,
                status: true,
            })


            return res.status(201).send(cartCreated)

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao criar carrinho',
                cause: error.message,
            })
        }
    }

    async findAll(req, res) {
        try {
            const carts = await Cart.findAll()

            if(!carts) {
                return res.status(404).send({
                    message: 'ainda não há nenhum carrinho aqui'
                })
            }

            return res.status(200).send(carts)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar todos os carrinhos',
                cause: error.message,
            })
        }
    }

    async findOne(req, res) {
        try {
            const { cartId } = req.params
            const cart = await Cart.findByPk(cartId)

            if(!cart) {
                return res.status(404).send({
                    message: 'carrinho não encontrado'
                })
            }

            return res.status(200).send({cart})

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar carrinho',
                cause: error.message,
            })
        }
    }

    async remove(req, res) {
        try {
            const { cartId } = req.params
            const cart = await Cart.findByPk(cartId)

            if(!cart) {
                return res.status(404).send({
                    message: 'carrinho não encontrado'
                })
            }

            await cart.destroy()

            return res.status(200).send({
                message: 'carrinho removido com sucesso'
            })

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao remover carrinho',
                cause: error.message,
            })
        }
    }

    async restore(req, res) {
        try {
            const { cartId } = req.params
            const cart = await Cart.findOne({where: {cartId:cartId}, paranoid: false})

            if(!cart) {
                return res.status(404).send({
                    message: 'carrinho não encontrado'
                })
            }

            await cart.restore()

            return res.status(200).send('carrinho restaurado com sucesso')

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao restaurar carrinho',
                cause: error.message,
            })
        }
    }

    async findAllAdm(req, res) {
        try {
            const cart = await Cart.findAll({
                paranoid: false,
            })

            if(!cart) {
                return res.status(404).send({
                    message: 'carrinho não encontrado'
                })
            }

            return res.status(200).send({cart})

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar todos os carrinhos',
                cause: error.message,
            })
        }
    }

    async buyProduct(req, res) {
        try {
            const { cartId, productId } = req.body

            const cart = await Cart.findOne({
                where: {
                    cartId:cartId
                }
            })

            const product = await Product.findOne({
                where: {
                    productId:productId
                }
            })

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }

            await cart.addProduct(product)

            return res.status(201).send({
                message: 'produto atribuído com sucesso ao carrinho'
            })

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao atribuir produto ao carrinho',
                cause: error.message
            })
        }
    }
}

module.exports = new CartController()