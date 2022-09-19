const db = require('../models')
const Dentist = db.dentists
const Op = db.Sequelize.Op

exports.listing = (req, res) => {
    let response = { status: true }
    const name = req.query.name
    var condition = name
        ? {
              //first_name : {[Op.like]: `%${name}%`}
              [Op.or]: [
                  { first_name: { [Op.like]: `%${name}%` } },
                  { last_name: { [Op.like]: `%${name}%` } },
              ],
          }
        : null

    Dentist.findAll({
        where: condition,
        order: [['id', 'desc']],
    })
        .then((data) => {
            response.data = data
            res.send(response)
        })
        .catch((error) => {
            response.status = false
            response.message = error
            res.status(500).send(response)
        })
}

exports.get = async (req, res) => {
    var response = { status: true }

    const record = await Dentist.findByPk(req.params.id)

    if (!record) {
        response.status = false
        response.message = 'Dentist not found'
    }

    if (record) {
        response.data = record
    }
    res.send(response)
}
