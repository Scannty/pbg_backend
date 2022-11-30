const { ObjectId } = require('mongodb')
const { getDb } = require('../utils/database')

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
        this.stock = 0
    }

    save(productId) {
        const db = getDb()
        if (productId) {
            return db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(productId) }, { $set: this })
        }
        return db.collection('products').insertOne(this)
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('products').find().toArray()
    }

    static deleteById(productId) {
        const db = getDb()
        return db
            .collection('products')
            .deleteOne({ _id: new ObjectId(productId) })
    }
}

module.exports = Product