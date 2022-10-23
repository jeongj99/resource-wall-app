const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('create a post!')
});

module.exports = router;
