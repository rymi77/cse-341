const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const app = express();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://Lycanius:testUser1@cluster0.sybh5.mongodb.net/myFirstDatabase';

const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});
//const csrfProtection = csrf();

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const prove01Routes = require('./routes/prove01');
const prove02Routes = require('./routes/prove02');
const prove08Routes = require('./routes/prove08');
const prove09Routes = require('./routes/prove09');
const shopRoutes = require('./routes/eCommerce');

const corsOptions = {
  origin: "https://<your_app_name>.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

app.use(
  session({
    secret: 'new secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);
//app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuth = req.session.isLoggedIn;
  //res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')

   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/prove01', prove01Routes)
   .use('/prove02', prove02Routes)
   .use('/prove08', prove08Routes)
   .use('/prove09', prove09Routes)
   .use('/eCommerce', shopRoutes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   });
   //.listen(PORT, () => console.log(`Listening on ${ PORT }`));

mongoose
  .connect(
    'mongodb+srv://Lycanius:testUser1@cluster0.sybh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

