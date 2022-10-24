const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  res.render('');
});

router.get('/:id', (req, res) => {
  res.send(`individual post with id`);
});

module.exports = router;
