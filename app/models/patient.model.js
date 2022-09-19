module.exports = function (sequelize, Sequelize) {
    const Patient = sequelize.define('patients', {
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.ENUM('Male', 'Female'),
        },
        age: {
            type: Sequelize.INTEGER,
        },
        active: {
            type: Sequelize.ENUM('1', '0'),
        },
        dentist_id: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return this.getDataValue('createdAt').toLocaleDateString(
                    'en-GB'
                )
            },
        },
    })

    Patient.getListing = async (dentistID) => {
        let condition = null

        if (dentistID) {
            condition = {
                dentist_id: dentistID,
            }
        }

        const data = await Patient.findAll({
            where: condition,
            order: [['id', 'desc']],
        })

        return data
    }

    return Patient
}
