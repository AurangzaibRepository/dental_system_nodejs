const express = require('express')
const Console = require('console')
const cors = require('cors')
const apiAuthorization = require('./app/middlewares/api-authorization')
const db = require('./app/models')
const app = express()
var corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

db.sequelize.sync().then(
    function () {
        Console.log('Database connected successfully')
    },
    function (error) {
        Console.log(`Database connection error: ${error}`)
    }
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(apiAuthorization)

// Routes
require('./app/routes/dentist.route')(app)
require('./app/routes/technician.route')(app)
require('./app/routes/patient.route')(app)

const port = process.env.port || 8000

app.listen(port, () => {
    Console.log(`Server is up at port ${port}`)
})
