module.exports = (app) => {
    const patients = require('../controllers/patients.controller')
    const router = require('express').Router()

    router.get('/:dentistID?', patients.listing)

    app.use('/api/patients', router)
}
