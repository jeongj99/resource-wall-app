const db = require('../connection');

//This function will take in the input the user put in the rating form and deposit it in the database.

const createRating = (body) => {
  const queryString =
  `INSERT INTO post_ratings (user_id, post_id, rating) VALUES ($1, $2, $3) RETURNING *`
  return db.query(queryString, [body.user_id, body.post_id, body.rating])
  .then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return err;
  });
}

module.exports = { createRating };
