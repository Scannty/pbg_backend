const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const { initIo } = require('./utils/socket')
const shopRoutes = require('./routes/shop')
const { connectMongo } = require('./utils/database')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.use('/shop', shopRoutes)

app.use((error, req, res, next) => {
    console.log('Marko je kriv')
    const { statusCode, message, data } = error
    res.status(statusCode || 500).json({ message, data })
})

connectMongo(() => {
    const server = app.listen(8000, () => console.log('Server started...'))
    const io = initIo(server)
    io.on('connection', socket => {
        console.log('Client connected to socket...')
    })
})