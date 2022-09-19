module.exports = function (sequelize, Sequelize) {
    const Op = Sequelize.Op

    const Dentist = sequelize.define('dentists', {
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        profile_picture: {
            type: Sequelize.STRING,
        },
        active: {
            type: Sequelize.INTEGER,
        },
        subscription: {
            type: Sequelize.ENUM('Free', 'Premium'),
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get() {
                return this.getDataValue('createdAt').toLocaleDateString(
                    'en-GB'
                )
            },
        },
    })

    Dentist.getListing = async (name) => {
        let condition = null
        if (name) {
            condition = {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${name}%` } },
                    { last_name: { [Op.like]: `%${name}%` } },
                ],
            }
        }

        const data = await Dentist.findAll({
            where: condition,
            order: [['id', 'desc']],
        })

        return data
    }

    Dentist.updateRecord = async (id, status) => {
        let response = await Dentist.update(
            { active: status },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(() => {
                let message =
                    'Dentist ' +
                    (status == 1 ? 'activated' : 'deactivated') +
                    ' successfully'
                return {
                    status: true,
                    message: message,
                }
            })
            .catch((error) => {
                return {
                    status: false,
                    message: error.message,
                }
            })

        return response
    }

    return Dentist
}
