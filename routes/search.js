const express = require('express');
const router = express.Router();
const searching = require('../db/queries/searchPost');

router.get('/', (req, res) => {
  if (req.query.posts) {
    const queryArray = req.query.posts.split(' ');
    searching.getSearchedPosts(queryArray).then(posts => {
      return res.render('index', { posts });
    })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    return res.redirect('/');
  }
});

module.exports = router;
