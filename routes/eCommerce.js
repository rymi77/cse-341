const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsControl = require('../control/product');
const adminControl = require('../control/admin');
const authControl = require('../control/auth');
const isAuth = require('../middleware/is-auth');

router.get('/login', authControl.getLogin);

router.get('/signup', authControl.getSignUp);

router.post('/login', authControl.postLogin);

router.post('/signup', authControl.postSignup);

//router.post('/logout', authControl.postLogout);


router.get('/admin-products', isAuth, adminControl.adminProducts);

router.post('/update-product', isAuth, adminControl.postEditProduct);

router.get('/add-product', isAuth, adminControl.addProduct);

router.post('/add-product', isAuth, adminControl.postAddProduct);

router.get('/update/:productId', isAuth, adminControl.updateProduct);

router.get('/add-cart/:productId', isAuth, productsControl.addCart);

router.get('/get-cart', isAuth, productsControl.getCart);

router.post('/remove-cart', isAuth, productsControl.removeCart);

router.get('/:productId', productsControl.getProduct);

router.get('/', productsControl.getProducts);

module.exports = router;