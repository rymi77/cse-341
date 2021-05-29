const Product = require('../models/products');
const { validationResult } = require('express-validator/check');

exports.addProduct = (req, res, next) => {
  res.render('pages/project01/addProduct', { 
      title: 'Add Product', 
      path: '/addProduct',
      errorMessage: null
  });
}

exports.adminProducts = (req, res, next) => {
  const email = req.session.user.email;
  console.log(email);
  Product.find({user: email}).then(products => {
      res.render('pages/project01/adminProducts', { 
          title: 'The Tech Comm', 
          path: '/adminProducts',
          data: products,
          activeTA03: true, // For HBS
          contentCSS: true, // For HBS
      });
  });
}

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).then(product => {
    res.render('pages/project01/updateProduct', { 
        title: 'Update Product', 
        path: '/updateProduct',
        data: product,
        errorMessage: null
    });
  });
}

exports.postAddProduct = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).render('pages/project01/addProduct', { 
      title: 'Add Product', 
      path: '/addProduct',
      errorMessage: error.array()[0].msg,
    });
  }

  const featured = req.body.featured;
  const category = req.body.category;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const summary = req.body.summary;
  const description = req.body.description;
  const user = req.session.user.email;
  const product = new Product({
    featured: featured,
    category: category,
    title: title,
    imageUrl: imageUrl,
    price: price,
    summary: summary,
    description: description,
    user: user
  });
  product.save()
  .then(result => {
    console.log('Created Product');
    res.redirect('/eCommerce')
  })
  .catch(err => {
    console.log(err);
  });
}

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return Product.findById(id).then(product => {
      res.status(422).render('pages/project01/updateProduct', { 
          title: 'Update Product', 
          path: '/updateProduct',
          data: product,
          errorMessage: null
      });
    });
  }
  const featured = req.body.featured;
  const category = req.body.category;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const summary = req.body.summary;
  const description = req.body.description;
  Product.findById(id).then(product => {
    featured: featured,
    product.category = category,
    product.title = title,
    product.imageUrl = imageUrl,
    product.price = price,
    product.summary = summary,
    product.description = description
    return product.save();
  })
  .then(result => {
    console.log('Updated Product');
    res.redirect('/eCommerce')
  })
  .catch(err => {
    console.log(err);
  });
}