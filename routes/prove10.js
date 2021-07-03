const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../data/ta10-data.json')

router.get('/', (req, res, next) => {
    res.render('pages/prove10', {
        title: 'Prove 10/11',
        path: '/prove10'
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
    console.log('here')
    if (req.body.newName !== undefined) {
        const newName = req.body.newName

        // Make our submissions somewhat unique.
        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
});

module.exports = router;