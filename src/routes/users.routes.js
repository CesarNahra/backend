const {create, findAll, findOne, login, findAllAdm, remove, restore, update} = require('../controller/user.controller')
const {Router} = require('express')
const {auth} = require('../middlewares/auth.middleware');
const {logger} = require('../middlewares/logger.middleware');

class UserRouter{
    routesFromUser() {
        const userRoutes = Router()
        userRoutes.post('/users', create)
        userRoutes.get('/users', auth, findAll)
        userRoutes.get('/users/:userId', auth, findOne)
        userRoutes.get('/usersAdm/', auth, findAllAdm)
        userRoutes.delete('/users/:userId/remove', auth, remove)
        userRoutes.post('/users/:userId/restore', auth, restore)
        userRoutes.patch('/users/:userId', auth, update)
        userRoutes.post('/users/login', login)
        return userRoutes
    }
}

module.exports = new UserRouter()