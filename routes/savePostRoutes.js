const express = require('express');
const router  = express.Router();

const savePostQueries = require('../db/queries/savePost')

// COMMENTS - REST API CRUD
// Create - POST
router.post('/', (req, res) => {
  const newSavePost = {
    folder_id: 1,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  }
  console.log(newSavePost);
  savePostQueries.createSavePost(newSavePost)
  .then((savePost) => {
    res.redirect(`/post/${req.body.post_id}`);
  })
});

module.exports = router;

