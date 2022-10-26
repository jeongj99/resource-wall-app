const express = require('express');
const { createPost } = require('../db/queries/createPost');
// const { createComment } = require('../db/queries/createComment');
const router = express.Router();
const postHelpers = require('../db/queries/postHelpers');


router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async(req, res) => {
  try {
    const created = await createPost(req.body);
    res.redirect('/')
  } catch (error) {
    res.send('Something went wrong');
  }
  // res.render('');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  postHelpers.getIndividualPost(id).then(post => {
    postHelpers.getPostComments(id).then(comment => {
      if (!post) {
        return res.send('Post does not exist');
      }
      const templateVars = { post, comment }
      return res.render('individualPost', templateVars);
    })
    .catch(error => {
      console.log(error.message);
    });
  })
});

module.exports = router;
