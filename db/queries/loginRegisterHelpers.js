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

const getUserByHandler = handler => {
  const queryString = `
  SELECT *
  FROM users
  WHERE handler = $1
  `;
  return db.query(queryString, ['@' + handler])
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.log(error.message);
    });
};

const registerUser = (firstName, lastName, email, finalHandler, hashedPassword) => {
  const queryString = `
  INSERT INTO users (first_name, last_name, email, handler, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const params = [firstName, lastName, email, finalHandler, hashedPassword];

  return db.query(queryString, params)
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = { getUserByEmail, getUserByHandler, registerUser };
