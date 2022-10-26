const db = require('../connection');

//This function will allow a user to save a folder in the database, tied to their own user_id
//This function will be called within the saveFolders route within the routes folder.

const createSaveFolder = (body) => {
  console.log('body', body)
  const queryString =
  `INSERT INTO folders(user_id, title) VALUES ($1, $2) RETURNING *`
  return db.query(queryString, [body.user_id, body.title])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return err;
  });
}

module.exports = { createSaveFolder }
