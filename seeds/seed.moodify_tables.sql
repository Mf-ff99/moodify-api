BEGIN;

TRUNCATE
    moodify_moods,
    moodify_users,
    moodify_categories RESTART IDENTITY CASCADE;

INSERT INTO moodify_categories (category)
VALUES
  ('Work'),
  ('Study'),
  ('Substances'),
  ('Day off'),
  ('Play');

INSERT INTO moodify_users (user_name, password)
VALUES
  ('dunder', '$2a$10$pA7DYxURtAGDDdsp/vvZtOxbtB/4vpq3u/Pt5TCQSv9vTbtD4FreO');

INSERT INTO moodify_moods (current_mood, note, user_id, date_added, category_id)
VALUES
    (6, 'today sucked ass', 1, '2020-09-04 11:37:30', 1),
    (8, 'today sucked ass', 1, '2020-09-29 11:37:30', 3);



COMMIT;