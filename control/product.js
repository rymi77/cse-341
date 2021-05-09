exports.getHome = (req, res, next) => {
    res.render('pages/project01/home', { 
        title: 'The Tech Comm', 
        path: '/home',
        data: data,
        category : category,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
}