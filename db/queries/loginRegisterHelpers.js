const db = require('../connection');

const getUserByEmail = email => {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  return db.query(queryString, [email])
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = { getUserByEmail };
