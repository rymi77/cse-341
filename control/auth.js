const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {
  res.render('pages/project01/login', { 
    title: 'Login', 
    path: '/login',
    errorMessage: null
  });
};

exports.getSignUp = (req, res, next) => {
  res.render('pages/project01/signup', { 
    title: 'Sign Up', 
    path: '/signup' ,
    errorMessage: null
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).render('pages/project01/login', { 
      title: 'Login', 
      path: '/login',
      errorMessage: error.array()[0].msg,
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log('Invalid email or password.');
        return res.redirect('/eCommerce/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/eCommerce');
            });
          }else{
            console.log('Invalid email or password.');
            res.redirect('/eCommerce/login');
          }
        })
        .catch(err => {
          console.log(err);
          res.redirect('/eCommerce/signup');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).render('pages/project01/signup', { 
      title: 'Sign Up', 
      path: '/signup' ,
      errorMessage: error.array()[0].msg,
    });
  }

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log( 'E-Mail exists already, please pick a different one.');
        return res.redirect('/eCommerce/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/eCommerce/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/eCommerce');
  });
};