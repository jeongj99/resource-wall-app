const db = require('../connection');

const createPost = (user_id, createObj) => {
  console.log("createObj",createObj)
  const queryString =
  'INSERT INTO created_posts (user_id, title, description, url, photo_url) VALUES ($1, $2, $3, $4, $5);'
  return db.query(queryString, [user_id, createObj.title, createObj.description, createObj.urlLink, createObj.photoUrl])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
    return err;
  });
}

module.exports = { createPost };
