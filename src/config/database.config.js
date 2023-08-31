const { config } = require('dotenv');
config();

console.log()

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    define: {
        underscored: true,
        underscoredAll: true,
    }
}