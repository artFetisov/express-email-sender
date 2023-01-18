const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const corsMiddleware = require('./cors.middleware')

dotenv.config()

const mailService = require('./mail-service')

const app = express()
const PORT = process.env.PORT || 5000

// app.use(corsMiddleware)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send({
        art: process.env.SMTP_SERVICE,
        user: process.env.SMTP_USER,
    })
})

app.post('/send-mail', async (req, res) => {
    try {
        const data = req.body

        res.status(200).send(data)

        await mailService.sendEmail(data)
    } catch (error) {
        console.log('ERROR')
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

module.exports = app