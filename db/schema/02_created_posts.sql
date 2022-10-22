-- Drop and recreate created_posts table

DROP TABLE IF EXISTS created_posts CASCADE;

CREATE TABLE created_posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL
);
