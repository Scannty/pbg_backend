const express = require('express')
const { body } = require('express-validator')
const isAuth = require('../middleware/isAuth')
const uploadImage = require('../utils/multer')
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/getProducts', shopController.getProducts)

router.post(
    '/addProduct',
    uploadImage.single('image'),
    /* isAuth */
    [
        body('title', 'Invalid title, must be at least 3 characters long').isString().isLength({ min: 3 }).trim(),
        body('price', 'Invalid price').isFloat(),
        body('description', 'Invalid description must be between 5 and 400 characters long').isLength({ min: 5, max: 400 }).trim()
    ],
    shopController.addProduct
)

router.put(
    '/editProduct:productId',
    /* isAuth */
    [
        body('title', 'Invalid title, must be at least 3 characters long').isString().isLength({ min: 3 }).trim(),
        body('price', 'Invalid price').isFloat(),
        body('description', 'Invalid description must be between 5 and 400 characters long').isLength({ min: 5, max: 400 }).trim()
    ],
    shopController.editProduct
)

router.put('/addStock/:productId', shopController.addStock)

router.delete('/deleteProduct/:productId', /* isAuth, */ shopController.deleteProduct)

module.exports = router