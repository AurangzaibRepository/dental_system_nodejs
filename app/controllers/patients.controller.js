const db = require('../models')
const Patient = db.patient
const Dentist = db.dentist
const Helper = require('../helpers/helper')

exports.listing = async (req, res) => {
    try {
        let dentistID = req.params.dentistID

        if (dentistID) {
            const dentistRecord = await Dentist.findByPk(req.params.dentistID)

            if (!dentistRecord) {
                return Helper.response(res, false, 'Dentist not found')
            }
        }

        const data = await Patient.getListing(dentistID)

        return Helper.response(res, true, null, data)
    } catch (error) {
        return Helper.response(res, false, error.message, null)
    }
}
