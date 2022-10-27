const db = require('../connection');

const getPostsByUserId = userId => {
  const queryString = `
  SELECT *
  FROM created_posts
  WHERE user_id = $1
  `;
  return db.query(queryString, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log(error.message);
    });
};

const getFoldersByUserId = userId => {
  const queryString = `
  SELECT *
  FROM folders
  WHERE user_id = $1
  `;
  return db.query(queryString, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = {
  getPostsByUserId,
  getFoldersByUserId
};
