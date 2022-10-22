-- Drop and recreate post_ratings table

DROP TABLE IF EXISTS post_ratings CASCADE;

CREATE TABLE post_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES created_posts(id) ON DELETE CASCADE,
  rating SMALLINT
);
