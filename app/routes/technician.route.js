const router = require('express').Router()
const technicians = require('../controllers/technicians.controller')

module.exports = (app) => {
    router.get('/:name?/:email?/:active?', technicians.listing)
    router.get('/:id', technicians.get)
    router.post('/status', technicians.changeStatus)

    app.use('/api/technicians', router)
}
