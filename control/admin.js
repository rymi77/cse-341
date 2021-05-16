const Product = require('../models/products');

exports.addProduct = (req, res, next) => {
  res.render('pages/project01/addProduct', { 
      title: 'Add Product', 
      path: '/addProduct',
      activeTA03: true, // For HBS
      contentCSS: true, // For HBS
  });
}

exports.adminProducts = (req, res, next) => {
  Product.find().then(products => {
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
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
  });
}

exports.postAddProduct = (req, res, next) => {
  const featured = req.body.featured;
  const category = req.body.category;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const summary = req.body.summary;
  const description = req.body.description;
  const product = new Product({
    featured: featured,
    category: category,
    title: title,
    imageUrl: imageUrl,
    price: price,
    summary: summary,
    description: description
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
  id = req.body.id;
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