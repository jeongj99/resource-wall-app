const express = require('express');
const router = express.Router();
const postHelpers = require('../db/queries/postHelpers');
const homeHelpers = require('../db/queries/home');

router.get('/', (req, res) => {
  if (req.query.posts) {
    const queryArray = req.query.posts.split(' ');
    postHelpers.getSearchedPosts(queryArray).then(posts => {
      const userLoggedIn = req.session.user_id;
      if (req.session.user_id) {
        const id = req.session.user_id;
        homeHelpers.getUserById(id).then(user => {
          return res.render('index', { userLoggedIn, posts, user });
        })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        return res.render('index', { userLoggedIn, posts });
      }
    })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    return res.redirect('/');
  }
});

module.exports = router;
