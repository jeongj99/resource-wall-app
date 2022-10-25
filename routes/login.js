const express = require('express');
const router = express.Router();
const loginHelpers = require('../db/queries/loginRegisterHelpers');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

router.use(cookieSession({
  name: 'session',
  keys: ['alex', 'jordan']
}));

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  loginHelpers.getUserByEmail(email).then(user => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.send('failed login');
    } else {
      req.session.user_id = user.id;
      return res.redirect('/');
    }
  });
});

module.exports = router;
