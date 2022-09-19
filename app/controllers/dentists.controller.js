const Helper = require('../helpers/helper')
const db = require('../models')
const Dentist = db.dentist

exports.listing = async (req, res) => {
    try {
        /*var condition = name ? {
            //first_name : {[Op.like]: `%${name}%`}
            [Op.or]: [
                {first_name: {[Op.like]: `%${name}%`}}, 
                {last_name: {[Op.like]: `%${name}%` }}
            ]
        } : null;*/
        const data = await Dentist.getListing(req.query.name)

        return Helper.response(res, true, null, data)
    } catch (error) {
        return Helper.response(res, false, error.message, null)
    }
}

exports.get = async (req, res) => {
    try {
        const record = await Dentist.findByPk(req.params.id)

        if (!record) {
            return Helper.response(res, false, 'Dentist not found', null)
        }

        return Helper.response(res, true, null, record)
    } catch (error) {
        return Helper.response(res, false, error.message, null)
    }
}

exports.changeStatus = async (req, res) => {
    const { id, status } = req.params

    /*Dentist.update(
        {active: status},
        {
            where: {id: id} 
        }
    )
    .then(() => {
        message = `Dentist ${status === '1' ? 'activated' : 'deactivated'} successfully`;
        return Helper.response(res, true, message, null);
    })
    .catch(error => {
        console.log(error);
        return Helper.response(res, false, error, null);
    });*/
    let response = await Dentist.updateRecord(id, status, res)

    return Helper.response(res, response.status, response.message, null)
}
