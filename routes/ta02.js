//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const userlist = [];

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/addUser',(req, res, next) => {
    userlist.push({username: req.body.username});
    res.render('pages/addUser', { 
        title: 'User List', 
        users: userlist,
        path: '/addUser', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/removeUser',(req, res, next) => {
    const removeUser = req.body.username;
    for(var i = userlist.length; i--; ){
        if (userlist[i].username == removeUser){
            userlist.splice(i, 1);
        }
    }
    res.render('pages/addUser', { 
        title: 'User List', 
        users: userlist,
        path: '/addUser', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;