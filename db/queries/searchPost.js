const db = require('../connection');

const getSearchedPosts = (query) => {
  const params = [];
  for (const word of query) {
    params.push(`%${word}%`);
  }

  let titleSearch = `WHERE LOWER(title) LIKE `;
  let descriptionSearch = `
  OR LOWER(description) LIKE `;
  let urlSearch = `
  OR LOWER(url) LIKE `;

  let queryString = `
  SELECT *
  FROM created_posts
  `;

  for (let i = 1; i <= params.length; i++) {
    if (i === params.length) {
      titleSearch += `LOWER($${i})`;
      descriptionSearch += `LOWER($${i})`;
      urlSearch += `LOWER($${i})`;
    } else {
      titleSearch += `LOWER($${i}) OR LOWER(title) LIKE `;
      descriptionSearch += `LOWER($${i}) OR LOWER(description) LIKE `;
      urlSearch += `LOWER($${i}) OR LOWER(url) LIKE `;
    }
  }

  queryString += (titleSearch + descriptionSearch + urlSearch);

  return db.query(queryString, params)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = { getSearchedPosts };
