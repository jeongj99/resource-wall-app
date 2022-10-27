const db = require('../connection');

//This function will allow a user to save a particular post on the click of the save button
//This function will be called within the savePost route within the routes folder.
const createSavePost = (body) => {
  const queryString =
  `INSERT INTO saved_posts (user_id, folder_id, post_id) VALUES ($1, $2, $3) RETURNING *`
  return db.query(queryString, [body.user_id, body.folder_id, body.post_id])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return err;
  });
}

module.exports = { createSavePost }
