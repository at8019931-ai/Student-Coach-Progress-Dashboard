-- ============================================================
-- CircleChess — Seed Data
-- ============================================================

-- ─── ACHIEVEMENTS CATALOG ───────────────────────────────────
INSERT INTO achievements (name, description, badge_icon, badge_color, trigger_type, trigger_value, points) VALUES
  ('First Class',           'Attended your first chess class!',             '🎓', '#6366f1', 'classes',    1,   10),
  ('10 Classes',            'Attended 10 classes — you are dedicated!',     '📚', '#8b5cf6', 'classes',    10,  25),
  ('50 Classes',            'Half a century of chess learning!',            '🏅', '#a78bfa', 'classes',    50,  100),
  ('Puzzle Starter',        'Solved your first 10 puzzles.',                '🧩', '#f59e0b', 'puzzles',    10,  10),
  ('Puzzle Hunter',         'Solved 50 puzzles — patterns are your friend!','🎯', '#f97316', 'puzzles',    50,  30),
  ('Puzzle Master',         'Solved 100 puzzles — truly impressive!',       '⚡', '#ef4444', 'puzzles',    100, 75),
  ('Puzzle Legend',         'Solved 500 puzzles — you are unstoppable!',    '💎', '#ec4899', 'puzzles',    500, 200),
  ('1000 Rating',           'Reached a rating of 1000!',                   '⭐', '#eab308', 'rating',     1000, 50),
  ('1200 Rating',           'Reached a rating of 1200!',                   '🌟', '#f59e0b', 'rating',     1200, 75),
  ('1500 Rating',           'Reached 1500 — intermediate master!',          '🔥', '#ef4444', 'rating',     1500, 150),
  ('1800 Rating',           'Reached 1800 — advanced player!',              '💫', '#8b5cf6', 'rating',     1800, 300),
  ('First Win',             'Won your first recorded game!',                '🏆', '#22c55e', 'games',      1,   20),
  ('10 Games Played',       'Played 10 games — experience builds!',        '🎮', '#14b8a6', 'games',      10,  25),
  ('Attendance Champion',   'Maintained 90%+ attendance!',                  '📅', '#06b6d4', 'attendance', 90,  100),
  ('Perfect Month',         'Completed all tasks for a full month!',        '🌙', '#6366f1', 'custom',     NULL, 150),
  ('Tournament Player',     'Participated in your first tournament!',       '⚔️', '#f97316', 'custom',     NULL, 50),
  ('Tournament Winner',     'Won a tournament — champion!',                 '👑', '#eab308', 'custom',     NULL, 200);

-- ─── LESSONS / CURRICULUM ROADMAP ───────────────────────────
-- Beginner lessons
INSERT INTO lessons (title, description, level, sequence_order, estimated_mins) VALUES
  ('How Pieces Move',        'Learn how each chess piece moves on the board.',    'beginner', 1,  30),
  ('Check and Checkmate',    'Understand how to check and checkmate the king.',   'beginner', 2,  30),
  ('Opening Principles',     'Control the centre, develop pieces, castle early.', 'beginner', 3,  45),
  ('Basic Tactics — Forks',  'Attack two pieces at once with a fork.',           'beginner', 4,  45),
  ('Basic Tactics — Pins',   'Pin a piece to the king or queen.',                'beginner', 5,  45),
  ('Basic Endgames',         'King and Pawn vs King endgame fundamentals.',       'beginner', 6,  60);

-- Intermediate lessons
INSERT INTO lessons (title, description, level, sequence_order, estimated_mins) VALUES
  ('Discovered Attack',      'Unleash a hidden piece by moving another.',         'intermediate', 1, 45),
  ('Skewers',                'Attack a high-value piece to win one behind it.',   'intermediate', 2, 45),
  ('Doubled Pawns',          'Understand pawn structure weaknesses.',             'intermediate', 3, 45),
  ('Rook Endgames',          'Lucena and Philidor positions.',                    'intermediate', 4, 60),
  ('Opening Preparation',    'Learn a solid opening repertoire.',                 'intermediate', 5, 90),
  ('Positional Play',        'Space, piece activity, and weak squares.',          'intermediate', 6, 60);

-- Advanced lessons
INSERT INTO lessons (title, description, level, sequence_order, estimated_mins) VALUES
  ('Complex Combinations',   'Multi-move tactical sequences and sacrifices.',     'advanced', 1, 60),
  ('Pawn Majorities',        'Using pawn structure advantages in endgames.',      'advanced', 2, 60),
  ('Complex Rook Endgames',  'Rook endgame technique at a high level.',           'advanced', 3, 90),
  ('Opening Theory',         'Deep theoretical preparation in your openings.',    'advanced', 4, 120),
  ('Prophylaxis',            'Anticipate and prevent your opponent''s ideas.',    'advanced', 5, 60),
  ('Tournament Preparation', 'Mental preparation and time management.',           'advanced', 6, 60);

-- Set prerequisites
UPDATE lessons SET prerequisite_id = (
  SELECT id FROM lessons WHERE title = 'How Pieces Move'
) WHERE title = 'Check and Checkmate';

UPDATE lessons SET prerequisite_id = (
  SELECT id FROM lessons WHERE title = 'Opening Principles'
) WHERE title = 'Basic Tactics — Forks';
