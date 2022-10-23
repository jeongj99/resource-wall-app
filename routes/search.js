const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.q) {
    res.send('query exists, so I will put posts that match the query value');
  }
  res.redirect('/');
});

module.exports = router;
