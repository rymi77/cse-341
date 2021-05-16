const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsControl = require('../control/product');
const adminControl = require('../control/admin');

router.get('/admin-products', adminControl.adminProducts);

router.post('/update-product', adminControl.postEditProduct);

router.get('/add-product', adminControl.addProduct);

router.post('/add-product', adminControl.postAddProduct);

router.get('/add-cart/:productId', productsControl.addCart);

router.get('/update/:productId', adminControl.updateProduct);

router.get('/get-cart', productsControl.getCart);

router.post('/remove-cart', productsControl.removeCart);

router.get('/:productId', productsControl.getProduct);

router.get('/', productsControl.getProducts);

module.exports = router;