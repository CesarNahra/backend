async function logger(req, res, next) {
    console.log('precisamos implementar um sistema de logs')
    next();
}

module.exports = {logger}