const db = require('../connection');

const createPost = (createQuery) => {
  let queryString =
  'INSERT INTO created_posts (title, description, url, photo_url) VALUES ($1, $2, $3, $4);'
  return pool.query(queryString, [createQuery.title, createQuery.description, createQuery.url, createQuery.photo_url])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


