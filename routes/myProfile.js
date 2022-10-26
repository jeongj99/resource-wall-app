const express = require('express');
const router = express.Router();
const homeHelpers = require('../db/queries/home');
const editProfileHelper = require('../db/queries/editProfile');

router.get('/', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
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

router.put('/edit', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    return res.redirect('/login');
  }
  const editedFirst = req.body.editFirstName;
  const editedLast = req.body.editLastName;
  editProfileHelper.editUserById(editedFirst, editedLast, userLoggedIn).then((editedUser) => {
    console.log(editedUser);
    return res.redirect('/my-profile');
  });
});

module.exports = router;
