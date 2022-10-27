// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(cookieSession({
  name: 'session',
  keys: ['alex', 'jordan']
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const myProfileRoute = require('./routes/myProfile');
const searchRoute = require('./routes/search');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/post');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments')
const ratingRoutes = require('./routes/ratings')
const savePostRoutes = require('./routes/savePostRoutes')
const saveFolderRoutes = require('./routes/saveFolderRoutes')
const myStuffRoute = require('./routes/myStuff');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/my-profile', myProfileRoute);
app.use('/search', searchRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/post', postRoute);
// app.use('/api/users', userApiRoutes);
app.use('/api/comments', commentsRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/savePost', savePostRoutes)
app.use('/api/saveFolder', saveFolderRoutes)
app.use('/my-stuff', myStuffRoute);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const homeHelpers = require('./db/queries/home');

app.get('/', (req, res) => {
  const userLoggedIn = req.session.user_id;
  const templateVars = {
    userLoggedIn
  };
  homeHelpers.getAllPosts().then(posts => {
    templateVars.posts = posts;
    homeHelpers.getUserById(userLoggedIn).then(user => {
      templateVars.user = user;
      return res.render('index', templateVars);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
