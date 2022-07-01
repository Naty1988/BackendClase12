const { Router } = require('express')
const router = Router()
const { getProducts, addProduct, showForm } = require('../controllers/productsController')

router.get('/products', getProducts)
router.post('/products', addProduct)
router.get('/productsForm', showForm)

module.exports = router