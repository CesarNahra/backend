const express = require('express');
const {connection} = require('./database/connection');
const routes = require('./routes');
const cors = require('cors');

class Server {
    constructor( server = express())
    {
        this.middlewares(server)
        this.database()
        this.allRoutes(server)
        this.initializeServer(server)
    }

    async middlewares(app) {
        app.use(cors())
        app.use(express.json())
    }

    async database() {
        try {
            await connection.authenticate();
            console.log('conexão bem sucedida')
        } catch (error) {
            console.error('não foi possível conectar', error)
        }
    }

    async initializeServer(app) {
        const PORT = 3333
        app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`))
    }

    async allRoutes(app) {
        app.use(routes)
    }
}

module.exports = {Server}