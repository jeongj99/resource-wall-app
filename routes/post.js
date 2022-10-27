const express = require('express');
const { createPost } = require('../db/queries/createPost');
// const { createComment } = require('../db/queries/createComment');
const router = express.Router();
const postHelpers = require('../db/queries/postHelpers');
const homeHelpers = require('../db/queries/home');


router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/create', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      console.log(user);
      res.render('create', { userLoggedIn, user });
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const created = await createPost(req.session.user_id, req.body);
    res.redirect('/');
  } catch (error) {
    res.send('Something went wrong');
  }
  // res.render('');
});

router.get('/:id', (req, res) => {
  const userLoggedIn = req.session.user_id;
  const id = req.params.id;
  postHelpers.getIndividualPost(id).then(post => {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      postHelpers.getPostComments(id).then(comment => {
        postHelpers.getUserFolders(userLoggedIn).then(userFolders => {
          if (!post) {
            return res.render('./errors/postDNE', { userLoggedIn, id });
          }
          const templateVars = { post, comment, userLoggedIn, user, userFolders };
          return res.render('individualPost', templateVars);
        })
          .catch(error => {
            console.log(error.message);
          });
      })
        .catch(error => {
          console.log(error.message);
        });
    })
      .catch(error => {
        console.log(error.message);
      });
  })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
