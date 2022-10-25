const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password, handler } = req.body;


});

module.exports = router;
