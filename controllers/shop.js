const { validationResult } = require('express-validator')
const Product = require('../models/product')
const { getIo } = require('../utils/socket')

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.fetchAll()
        if (!products) {
            const error = new Error('No products found!')
            error.statusCode(400)
            throw error
        }
        res.status(200).json({ products })
    } catch (error) {
        next(error)
    }
}

exports.addProduct = async (req, res, next) => {
    console.log('add product')
    const { title, price, description, imageUrl } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg)
        error.data = errors.array()
        return next(error)
    }
    const product = new Product(title, price, description, imageUrl)
    try {
        const result = await product.save()
        console.log(result)
        const io = getIo()
        io.emit('productAdded', { product })
        res.status(200).json({ message: 'Product added successfully!', product })
    } catch (error) {
        next(error)
    }
}

exports.editProduct = async (req, res, next) => {
    const { productId } = req.params
    const { title, price, description, imageUrl } = req.body
    const product = new Product(title, price, description, imageUrl)
    try {
        const result = await product.save(productId)
        console.log(result)
        res.status(200).json({ message: 'Product updated successfully!', newProduct: product })
    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const result = await Product.deleteById(productId)
        console.log(result)
        res.status(200).json({ message: 'Product deleted successfully!' })
    } catch (error) {
        console.log(error)
    }
}