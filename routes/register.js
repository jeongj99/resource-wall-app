const express = require('express');
const router = express.Router();
const registerHelpers = require('../db/queries/loginRegisterHelpers');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    const templateVars = {
      userLoggedIn: req.session.user_id
    };
    res.render('register', templateVars);
  }
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password, handler } = req.body;
  const userLoggedIn = req.session.user_id;
  if (userLoggedIn) {
    return res.redirect('/');
  }
  registerHelpers.getUserByEmail(email).then(user => {
    if (user) {
      return res.render('./errors/emailTakenRegister', { userLoggedIn });
    }
    registerHelpers.getUserByHandler(handler).then(user => {
      if (user) {
        return res.render('./errors/handlerTakenRegister', { userLoggedIn });
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
