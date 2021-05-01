//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const booklist = [];

router.get('/',(req, res, next) => {
    res.render('pages/prove02', { 
        title: 'Prove 02', 
        path: '/ta02', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/addBook',(req, res, next) => {
    booklist.push({title: req.body.book, summary: req.body.summary});
    res.render('pages/prove02list', { 
        title: 'Book List', 
        books: booklist,
        path: '/addBook', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/removeBook',(req, res, next) => {
    const removeBook = req.body.book;
    for(var i = booklist.length; i--; ){
        if (booklist[i].title == removeBook){
            booklist.splice(i, 1);
        }
    }
    res.render('pages/prove02list', { 
        title: 'Book List', 
        books: booklist,
        path: '/addBook', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;