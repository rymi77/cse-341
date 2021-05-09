const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsControll = require('../control/product')
const data = require('../data/products.json');
let category = null;

router.get('/', productsControll.getHome);

module.exports = router;