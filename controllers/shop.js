const { validationResult } = require('express-validator')
const Product = require('../models/product')
const { getIo } = require('../utils/socket')

exports.getProducts = async (req, res, next) => {
    try {
        console.log('Hurray')
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
    console.log('file: ', req.file)
    const image = req.file
    const imageUrl = image.path
    const { title, price, description } = req.body
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
    const { title, price, description } = req.body
    const product = new Product(title, price, description)
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
        const io = getIo()
        io.emit('productDeleted', { result, productId })
        res.status(200).json({ message: 'Product deleted successfully!' })
    } catch (error) {
        console.log(error)
    }
}

exports.addStock = async (req, res, next) => {
    const { productId } = req.params
    const { addStock } = req.query
    console.log(addStock)
    try {
        const result = await Product.addStockById(productId, addStock)
        console.log(result)
        const io = getIo()
        io.emit('stockAdded', { result, addStock, productId })
        res.status(200).json({ message: 'Added stock successfully!', addStock })
    } catch (error) {
        console.log(error)
    }
}