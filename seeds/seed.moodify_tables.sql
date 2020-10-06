BEGIN;

TRUNCATE
    moodify_moods,
    moodify_users;

INSERT INTO moodify_users (user_name, password)
VALUES
  ('dunder', '$2a$10$pA7DYxURtAGDDdsp/vvZtOxbtB/4vpq3u/Pt5TCQSv9vTbtD4FreO');

INSERT INTO moodify_moods (current_mood, note, user_id, date_added)
VALUES
    (6, 'today sucked ass', 1, '2020-09-04 11:37:30'),
    (8, 'today sucked ass', 1, '2020-09-29 11:37:30');

COMMIT;