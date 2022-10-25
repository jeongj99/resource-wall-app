const express = require('express');
const router = express.Router();
const registerHelpers = require('../db/queries/loginRegisterHelpers');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

router.use(cookieSession({
  name: 'session',
  keys: ['alex', 'jordan']
}));

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password, handler } = req.body;
  registerHelpers.getUserByEmail(email).then(user => {
    if (user) {
      return res.send('email already taken');
    }
    registerHelpers.getUserByHandler(handler).then(user => {
      if (user) {
        return res.send('handler already taken');
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const finalHandler = `@${handler}`;
        registerHelpers.registerUser(firstName, lastName, email, finalHandler, hashedPassword).then(user => {
          console.log(user);
          req.session.user_id = user.id;
          res.redirect('/');
        })
          .catch(error => {
            console.log(error.message);
          });
      }
    });
  });


});

module.exports = router;
