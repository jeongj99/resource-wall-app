const express = require('express');
const router  = express.Router();
const ratingsQueries = require('../db/queries/ratingPost')

//Ratings - REST API CRUD
//Create - POST

router.post('/', (req, res) => {
  const newRating = {
    rating: req.body.rating,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  }
  ratingsQueries.createRating(newRating)
  .then((rating) => {
    res.redirect(`/post/${req.body.post_id}`);
  })
});
