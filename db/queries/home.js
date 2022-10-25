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

const getUserById = (id) => {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.log(error.message);
    });
}
module.exports = { getAllPosts, getUserById };
