const express = require('express');
const router = express.Router();
const postHelpers = require('../db/queries/postHelpers');

router.get('/', (req, res) => {
  if (req.query.posts) {
    const queryArray = req.query.posts.split(' ');
    postHelpers.getSearchedPosts(queryArray).then(posts => {
      const userLoggedIn = req.session.user_id;
      return res.render('index', { posts, userLoggedIn});
    })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    return res.redirect('/');
  }
});

module.exports = router;
