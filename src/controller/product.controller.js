const { Product } = require('../models/Product');

class ProductController {
    async create(req, res) {
        try {
            const {
                name,
                description,
                price,
                logoUrl,
                category,
            } = req.body

            const existProduct = await Product.findOne({
                where: {
                    name:name
                }
            })

            if(existProduct) {
                return res.status(403).send({
                    message: 'produto já cadastrado com este nome'
                })
            }

            const productCreated = await Product.create({
                name,
                description,
                price,
                logoUrl,
                category,
            })

            return res.status(201).send(productCreated)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao criar produto',
                cause: error.message,
            })
        }
    }

    async findAll(req, res) {
        try {
            const products = await Product.findAll()

            return res.status(200).send(products)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar todos os produtos',
                cause: error.message,
            })
        }
    }

    async findOne(req, res) {
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }

            return res.status(200).send({product})
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar o usuário',
                cause: error.message,
            })
        }
    }

    async remove(req, res) {
        try {
            const {productId} = req.params
            const product = await Product.findByPk(productId)

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }

            await product.destroy()

            return res.status(200).send({
                message: 'produto removido com sucesso'
            })
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao remover o produto',
                cause: error.message,
            })
        }
    }

    async restore(req, res) {
        try {
            const {productId} = req.params
            const product = await Product.findOne({where: {productId:productId}, paranoid: false})

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }

            await product.restore()

            return res.status(200).send('produto restaurado com sucesso')
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao restaurar o produto',
                cause: error.message,
            })
        }
    }

    async findAllAdm(req, res) {
        try {
            const product = await Product.findAll({
                paranoid: false
            })

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }

            return res.status(200).send({product})
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar o produto',
                cause: error.message,
            })
        }
    }

    async update(req, res) {
        try {
            const { productId } = req.params
            const { price } = req.body 
            
            const product = Product.findByPk(productId)

            if(!product) {
                return res.status(404).send({
                    message: 'produto não encontrado'
                })
            }


            if(!price) {
                return res.status(400).send({
                    message: 'nenhum campo informado é válido para alteração'
                })
            }


            if(price === product.price) {
                return res.status(403).send({
                    message: 'produto já está com esse preço'
                })
            }

            await Product.update({price}, {where: {productId}})

            return res.status(204).send()

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao atualizar produto',
                cause: error.message,
            })
        }
    }
}

module.exports = new ProductController()