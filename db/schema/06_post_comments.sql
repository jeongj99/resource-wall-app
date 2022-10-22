-- Drop and recreate post_comments table

DROP TABLE IF EXISTS post_comments CASCADE;

CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES created_posts(id) ON DELETE CASCADE,
  comment VARCHAR(255)
);
