const express = require('express');
const router = express.Router();
const homeHelpers = require('../db/queries/home');

router.get('/', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      res.render('myStuff', { userLoggedIn, user });
    });
  }
});

module.exports = router;
