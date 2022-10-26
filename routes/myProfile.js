const express = require('express');
const router = express.Router();
const homeHelpers = require('../db/queries/home');

router.get('/', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      console.log(user);
      res.render('myProfile', { userLoggedIn, user });
    });
  }
});

router.get('/edit', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      console.log(user);
      res.render('editProfile', { userLoggedIn, user });
    });
  }
});

module.exports = router;
