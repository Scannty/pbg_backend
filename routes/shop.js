const express = require('express')
const { body } = require('express-validator')
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/getProducts', shopController.getProducts)

router.post(
    '/addProduct',
    [
        body('title', 'Invalid title, must be at least 3 characters long').isString().isLength({ min: 3 }).trim(),
        body('price', 'Invalid price').isFloat(),
        body('description', 'Invalid description must be between 5 and 400 characters long').isLength({ min: 5, max: 400 }).trim()
    ],
    shopController.addProduct
)

router.put(
    '/editProduct:productId',
    [
        body('title', 'Invalid title, must be at least 3 characters long').isString().isLength({ min: 3 }).trim(),
        body('price', 'Invalid price').isFloat(),
        body('description', 'Invalid description must be between 5 and 400 characters long').isLength({ min: 5, max: 400 }).trim()
    ],
    shopController.editProduct
)

router.post('/deleteProduct:productId', shopController.deleteProduct)

module.exports = router