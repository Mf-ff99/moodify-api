CREATE TABLE moodify_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE moodify_categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(30)
);

CREATE TABLE moodify_moods (
    id SERIAL PRIMARY KEY,
    note TEXT,
    current_mood INTEGER NOT NULL,
    category_id INTEGER REFERENCES moodify_categories(id),
    date_added TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id INTEGER REFERENCES moodify_users(id)
    ON DELETE SET NULL
);