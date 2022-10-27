const express = require('express');
const router  = express.Router();

const savePostQueries = require('../db/queries/savePost')
//Important note for all future routes, when linking to front end, values past in each route must mach with names/values in front end.

// COMMENTS - REST API CRUD
// Create - POST
router.post('/', (req, res) => {
  console.log('req.body test for select button',req.body);
  const newSavePost = {
    folder_id: req.body.folder_id,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  }
  savePostQueries.createSavePost(newSavePost)
  .then((savePost) => {
    res.redirect(`/post/${req.body.post_id}`);
  })
});

//Note: the remainder of CRUD operations were added and kept as they will be worked on in the future.

//Read All - GET
router.get('/', (req, res) => {
  res.send({ message: 'hello from Read all'});
});

//Read one - GET
router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Read one'});
});

//Update - POST
router.post('/:id', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Update Post'});
});

//Delete - POST
router.post('/:id/delete', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Delete Post'});
});

module.exports = router;
