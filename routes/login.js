const express = require('express');
const router = express.Router();
const loginHelpers = require('../db/queries/loginRegisterHelpers');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  console.log('------------------------------');
  const email = req.body.email;
  const password = req.body.password;
  loginHelpers.getUserByEmail(email).then(user => {
    if (!user || password !== user.password) {
      return res.send('failed login');
    } else {
      return res.redirect('/');
    }
  });
});

module.exports = router;
