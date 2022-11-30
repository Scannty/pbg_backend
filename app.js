const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const { initIo } = require('./utils/socket')
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')
const { connectMongo } = require('./utils/database')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 8000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use('/image', express.static(__dirname + '/images'));


app.get('/hello', (req, res, next) => res.status(200).json({ message: 'Helloo' }))
app.use('/shop', shopRoutes)
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    console.log('Marko je kriv')
    console.log(error)
    const { statusCode, message, data } = error
    res.status(statusCode || 500).json({ message, data })
})

connectMongo(() => {
    const server = app.listen(PORT, () => console.log('Server started, running on port ' + PORT))
    const io = initIo(server)
    io.on('connection', socket => {
        console.log('Client connected to socket...')
    })
})