const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.session.user_id) {
    req.session = null;
    res.redirect('/');
  }
});

module.exports = router;
