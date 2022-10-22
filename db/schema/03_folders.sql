-- Drop and recreate folders table

DROP TABLE IF EXISTS folders CASCADE;

CREATE TABLE folders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL
);
