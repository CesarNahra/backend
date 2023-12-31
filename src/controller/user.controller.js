const { sign } = require('jsonwebtoken');
const { User } = require('../models/User');
const { update, verifyUser } = require('../services/user.services');
const bcrypt = require('bcrypt')

class UserController {
    async create(req, res) {
        try {
            const {
                name,
                email,
                password
            } = req.body

            const existEmail = await User.findOne({
                where: {
                    email:email
                }
            })

            if(existEmail) {
                return res.status(403).send({
                    message: 'usuário já existente com esse email'
                })
            }

            const userCreated = await User.create({
                name,
                email,
                password
            })

            return res.status(201).send(userCreated)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao criar usuário',
                cause: error.message,
            })
        }
    }

    async findAll(req, res) {
        try {
            const users = await User.findAll()

            return res.status(200).send(users)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar todos os usuário',
                cause: error.message,
            })
        }
    }

    async findOne(req, res) {
        try {
            const {userId} = req.params
            const user = await User.findByPk(userId)

            if(!user) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            return res.status(200).send(`Usuário: ${user.email}`)
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar o usuário',
                cause: error.message,
            })
        }
    }

    async remove(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)

            if(!user) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            await user.destroy()

            return res.status(200).send({
                message: 'usuário removido com sucesso'
            })

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao remover usuário',
                cause: error.message,
            })
        }
    }

    async restore(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findOne({where: {userId:userId}, paranoid: false})

            if(!user) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            await user.restore()

            return res.status(201).send({
                message: 'usuário restaurado com sucesso'
            })

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao restaurar usuário',
                cause: error.message,
            })
        }
    }

    async findAllAdm(req, res) {
        try {
            const users = await User.findAll({paranoid: false})

            if(!users) {
                return res.status(404).send({
                    message: 'ainda não existem usuários cadastrados no sistema'
                })
            }

            return res.status(200).send(users)

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao listar todos usuários',
                cause: error.message,
            })
        }
    }

    async update(req, res) {
        try {
            const { userId } = req.params
            const { name } = req.body
            
            const user = await User.findByPk(userId)

            if(!user) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }


            if(!name) {
                return res.status(400).send({
                    message: 'nenhum campo informado é válido para alteração'
                })
            }


            if(name === user.name) {
                return res.status(403).send({
                    message: 'usuário já usa essa nome'
                })
            }

            await update(userId, { name })

            return res.status(204).send()

        } catch (error) {
            return res.status(400).send({
                message: 'erro ao atualizar usuário',
                cause: error.message,
            })
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({
                where: {
                    email
                }
            })

            const userVerified = await verifyUser(user)
            
            if(!userVerified) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            const match = bcrypt.compareSync(password, user.password)

            if(!match) {
                return res.status(401).send({
                    message: 'senha inválida'
                })
            }

            const payload = {
                userId: user.userId,
                name: user.name,
                email: user.email
            }

            const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).send({token})
            
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao realizar o login do usuário',
                cause: error.message,
            })
        }
    }

    async updatePassword(req, res) {
        try {
            const { userId } = req.params
            const { password } = req.body

            const user = await User.findByPk(userId)

            if(!user) {
                return res.status(404).send({
                    message: 'usuário não encontrado'
                })
            }

            const match = bcrypt.compareSync(password, user.password)
            
            if(match) {
                return res.status(400).json({
                    error: 'a senha já está sendo usada'
                })
            }

            await update(userId, { password })

            return res.status(204).send()
        } catch (error) {
            return res.status(400).send({
                message: 'erro ao realizar o update de senha do usuário',
                cause: error.message,
            })
        }
    }
}

module.exports = new UserController()