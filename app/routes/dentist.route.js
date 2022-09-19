module.exports = (app) => {
    const dentists = require('../controllers/dentists.controller')
    const router = require('express').Router()

    router.get('/', dentists.listing)
    router.get('/:id', dentists.get)
    router.post('/status/:id/:status', dentists.changeStatus)

    app.use('/api/dentists', router)
}
