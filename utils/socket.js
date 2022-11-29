const { Server } = require('socket.io')

let io

function initIo(server) {
    io = new Server(server, { cors: { origin: 'http://192.168.0.12:19000' } })
    return io
}

function getIo() {
    if (!io) throw new Error('Socket is not initialized!')
    return io
}

module.exports = { initIo, getIo }