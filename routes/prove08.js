const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = require('../data/ta03data.json');
let tag = null;
const itemsPerPage = 10;
const lastPage = Math.ceil(data.length / 10);

router.get('/',(req, res, next) => {
    const page = +req.query.page || 1;
    const itemNum = page * 10;
    let items = [];
    if(tag){
        items = data;
    }
    else{
        for(let i = itemNum - 10; i < itemNum; i++){
            items.push(data[i]);
        }
    }
    res.render('pages/prove08', { 
        title: 'Prove 08', 
        path: '/prove08', // For pug, EJS 
        data: items,
        tag: tag,
        currentPage: page,
        hasPrev: page > 1,
        prevPage: page - 1,
        hasNext: page < lastPage,
        nextPage: page + 1,
        lastPage: lastPage
    });
});

module.exports = router;