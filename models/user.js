const { ObjectId } = require('mongodb')
const { getDb } = require('../utils/database')

class User {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static findById(userId) {
        const db = getDb()
        return db.collection('users').find({ _id: new ObjectId(userId) }).next()
    }

    static findByEmail(email) {
        const db = getDb()
        return db.collection('users').find({ email: email }).next()
    }

    static findByUsername(username) {
        const db = getDb()
        return db.collection('users').find({ username: username }).next()
    }
}

module.exports = User