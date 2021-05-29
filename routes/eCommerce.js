const express = require('express');
const router = express.Router();
const fs = require('fs');
const { body} = require('express-validator/check');

const productsControl = require('../control/product');
const adminControl = require('../control/admin');
const authControl = require('../control/auth');
const isAuth = require('../middleware/is-auth');

router.get('/login', authControl.getLogin);

router.get('/signup', authControl.getSignUp);

router.post('/login', 
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authControl.postLogin);

router.post('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],       
  authControl.postSignup);

router.get('/logout', authControl.postLogout);

router.get('/admin-products', isAuth, adminControl.adminProducts);

router.post('/update-product', 
  [
    body('title')
      .isString()
      .isLength({ min: 5 })
      .trim(),
    body('imageUrl').isURL(),
    body('summary')
    .isLength({ min: 5, max: 200 })
    .trim(),
    body('description')
      .isLength({ min: 20, max: 1000 })
      .trim()
  ],
isAuth, adminControl.postEditProduct);

router.get('/add-product', 
  [
    body('title')
      .isString()
      .isLength({ min: 5 })
      .trim(),
    body('imageUrl').isURL(),
    body('summary')
    .isLength({ min: 5, max: 200 })
    .trim(),
    body('description')
      .isLength({ min: 20, max: 1000 })
      .trim()
  ],
isAuth, adminControl.addProduct);

router.post('/add-product', isAuth, adminControl.postAddProduct);

router.get('/update/:productId', isAuth, adminControl.updateProduct);

router.get('/add-cart/:productId', isAuth, productsControl.addCart);

router.get('/get-cart', isAuth, productsControl.getCart);

router.post('/remove-cart', isAuth, productsControl.removeCart);

router.get('/iPhone', productsControl.getiPhone);

router.get('/samsung', productsControl.getSamsung);

router.get('/other', productsControl.getOther);

router.get('/:productId', productsControl.getProduct);

router.get('/', productsControl.getProducts);

module.exports = router;