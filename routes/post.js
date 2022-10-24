const express = require('express');
const router = express.Router();
const postHelpers = require('../db/queries/postHelpers');

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/create', (req, res) => {
  res.send('Create post');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  postHelpers.getIndividualPost(id).then(post => {
    if (!post) {
      return res.send('Post does not exist');
    }
    return res.render('individualPost', { post });
  })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
