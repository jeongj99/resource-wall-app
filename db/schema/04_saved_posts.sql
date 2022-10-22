-- Drop and recreate saved_posts table

DROP TABLE IF EXISTS saved_posts CASCADE;

CREATE TABLE saved_posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES created_posts(id) ON DELETE CASCADE
);
