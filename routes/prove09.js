const express = require('express');
const router = express.Router();
const prove09Control = require('../control/prove09');

router.get('/',prove09Control.getPokemon);

module.exports = router;