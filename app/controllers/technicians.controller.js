const db = require('../models')
const Technician = db.technician
const Helper = require('../helpers/helper')

exports.listing = async (req, res) => {
    try {
        let data = await Technician.getListing(req)
        return Helper.response(res, true, null, data)
    } catch (error) {
        return Helper.response(res, false, error.message, null)
    }
}

exports.get = async (req, res) => {
    let response = { status: false }

    const data = await Technician.findByPk(req.params.id)

    if (!data) {
        response.message = 'Technician not found'
        res.status(200).send(response)
    }

    response.status = true
    response.data = data
    res.status(200).send(response)
}

exports.changeStatus = async (req, res) => {
    let response = { status: false }
    const { id, active } = req.body

    let technicianRecord = await Technician.findByPk(id)

    if (!technicianRecord) {
        response.message = 'Technician not found'
        res.status(200).send(response)
    }

    technicianRecord.active = active
    technicianRecord.save()

    response.status = true
    response.message =
        'Technician ' +
        (active == 1 ? 'activated' : 'deactivated') +
        ' successfully'
    res.status(200).send(response)
}
