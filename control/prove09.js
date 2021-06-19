const fetch = require("node-fetch");

const itemsPerPage = 10;
const lastPage = Math.ceil(1118 / 10);

exports.getPokemon = (req, res, next) => {
    const page = +req.query.page || 1;
    const offset = (page - 1) * 10;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
    .then(res => res.json())
    .then(resData =>     
        res.render('pages/prove09', { 
        title: 'Prove 09', 
        path: '/prove09', // For pug, EJS 
        data: resData.results,
        currentPage: page,
        hasPrev: page > 1,
        prevPage: page - 1,
        hasNext: page < lastPage,
        nextPage: page + 1,
        lastPage: lastPage
    }))
    .catch(err => console.log(err));
};