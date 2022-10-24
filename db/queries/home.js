const db = require('../connection');

const getAllPosts = () => {
  return db.query(`
  SELECT *
  FROM created_posts
  `)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = { getAllPosts };
