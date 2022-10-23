const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.send('this is my profile page!');
});

router.get('/edit-profile', (req, res) => {
  res.send('edit profile!');
});

module.exports = router;
