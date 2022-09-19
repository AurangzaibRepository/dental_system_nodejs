module.exports = (sequelize, Sequelize) => {
    const Op = Sequelize.Op

    const Technician = sequelize.define('technicians', {
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        active: {
            type: Sequelize.INTEGER,
        },
        subscription: {
            type: Sequelize.ENUM('Free', 'Premium'),
        },
    })

    Technician.getListing = async (req) => {
        let { email, active } = req.params
        let condition = {}

        if (active) {
            condition.active = active
        }

        if (email) {
            condition.email = {
                [Op.like]: `%${email}%`,
            }
        }

        const data = await Technician.findAll({
            where: condition,
            order: [['id', 'desc']],
        })

        return data
    }

    return Technician
}
