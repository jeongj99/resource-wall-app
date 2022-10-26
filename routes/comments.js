/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const commentsQueries = require('../db/queries/commentPost')

//COMMENTS - REST API CRUD
//Create - POST
router.post('/', (req, res) => {
  const newComment = {
    comment: req.body.comment,
    user_id: 1,
    post_id: req.body.post_id
  }
  commentsQueries.createComment(newComment)
  .then((comment) => {
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
