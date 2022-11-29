const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use((error, req, res, next) => {
    console.log('Marko je kriv')
    const { statusCode, message, data } = error
    res.status(statusCode || 500).json({ message, data })
})

connectMongo(() => {
    const server = app.listen(8000, () => console.log('Server started...'))
})