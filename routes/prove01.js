//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/prove01', { 
        title: 'Prove 01', 
        path: '/prove01', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/',(req, res, next) => {
    console.log('Post request!');
    
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const major = req.body.major;
    res.render('pages/prove01res', { 
        title: 'Prove 01', 
        first_name: first_name,
        last_name: last_name,
        major: major,
        path: '/prove01res', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;