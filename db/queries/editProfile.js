const db = require('../connection');

const editUserById = (editedFirst, editedLast, id) => {
  const queryString = `
  UPDATE users
  SET first_name = $1, last_name = $2
  WHERE id = $3
  RETURNING *
  `;
  return db.query(queryString, [editedFirst, editedLast, id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { editUserById };
