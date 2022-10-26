const db = require('../connection');

//This function takes user input from comment text area and deposits it into the SQL database.
const createComment = (body) => {
  console.log("createComm", body)
  const queryString =
  'INSERT INTO post_comments (user_id, post_id, comment) VALUES ($1, $2, $3) RETURNING *;'
  return db.query(queryString, [body.user_id, body.post_id, body.comment])
  .then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return err;
  });
}

module.exports = { createComment };
