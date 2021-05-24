const data = require('../data/products.json');
const Product = require('../models/products');
const Cart = require('../models/cart');
let category = null;

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render('pages/project01/home', { 
            title: 'The Tech Comm', 
            path: '/home',
            data: products,
            category : category
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.find().then(carts => {
        res.render('pages/project01/cart', { 
            title: 'Your Cart', 
            path: '/cart',
            data: carts,
            user: req.session.user._id,
            category : category
        });
    });
}

exports.removeCart = (req, res, next) => {
    const id = req.body.cartId;
    Cart.findByIdAndRemove(id)
    .then(result => {
        console.log('Removed Product');
        res.redirect('/eCommerce/get-cart');
    })
    .catch(err => {
          console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).then(product => {
        res.render('pages/project01/productDetails', { 
            title: 'The Tech Comm', 
            path: '/home',
            data: product,
            category : category
        });
    });
}

exports.addCart = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).then(product => {
        const cart = new Cart({
          productId: id,
          title: product.title,
          price: product.price,
          user: req.session.user._id
        });
        cart.save()
        .then(result => {
          console.log('Created Product');
          res.redirect('/eCommerce')
        })
        .catch(err => {
          console.log(err);
        });
    });
}