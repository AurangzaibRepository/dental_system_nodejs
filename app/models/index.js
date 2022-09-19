const dbConfig = require('../../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
    },
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.dentist = require('./dentist.model.js')(sequelize, Sequelize)
db.technician = require('./technician.model')(sequelize, Sequelize)
db.patient = require('./patient.model.js')(sequelize, Sequelize)
module.exports = db
