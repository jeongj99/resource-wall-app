const express = require('express');
const { createPost } = require('../db/queries/createPost');
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
    const created = await createPost(req.body);
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
      if (!post) {
        return res.send('Post does not exist');
      }
      return res.render('individualPost', { post, userLoggedIn, user });
    });
  })
    .catch(error => {
      console.log(error.message);
    });
});

router.post('/properties', (req, res) => {
  const userId = req.session.userId;
  database.addProperty({ ...req.body, owner_id: userId })
    .then(property => {
      res.send(property);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
