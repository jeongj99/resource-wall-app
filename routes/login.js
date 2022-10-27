const express = require('express');
const router = express.Router();
const loginHelpers = require('../db/queries/loginRegisterHelpers');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    const templateVars = {
      userLoggedIn: req.session.user_id
    };
    res.render('login', templateVars);
  }
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userLoggedIn = req.session.user_id;
  if (userLoggedIn) {
    return res.redirect('/');
  }
  loginHelpers.getUserByEmail(email).then(user => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.render('./errors/failedLogin', { userLoggedIn });
    } else {
      req.session.user_id = user.id;
      return res.redirect('/');
    }
  });
});

module.exports = router;
