//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = require('../ta03data.json');
let tag = null;

router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        data: data,
        tag: tag,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/search',(req, res, next) => {
    tag = req.body.search;
    res.redirect('/ta03/')
});

module.exports = router;