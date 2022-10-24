const db = require('../connection');

const createPost = (createObj) => {
  console.log("createObj", createObj)
  const queryString =
  'INSERT INTO created_posts (user_id, title, description, url, photo_url) VALUES ($1, $2, $3, $4, $5);'
  return db.query(queryString, [1, createObj.title, createObj.description, createObj.urlLink, createObj.photoUrl])
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

const addProperty = function(property) {
  return pool.query(
    `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code, property.active])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
