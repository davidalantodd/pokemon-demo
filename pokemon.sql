-- -- CREATE table of pokemon
-- CREATE TABLE IF NOT EXISTS pokemon (
--     id INTEGER PRIMARY KEY,
--     name TEXT,
--     type TEXT,
--     weight INTEGER
-- );

-- -- INSERT pokmeon into table
-- INSERT INTO pokemon (name, type, weight)
-- VALUES
--     ('Pikachu', 'Electric', 13),
--     ('Charmander', 'Fire', 19),
--     ('Bulbasaur', 'Grass', 15)
-- ;

-- -- SELECT all pokemon from table
-- SELECT * FROM pokemon;

-- -- UPDATE pikachu to be weight = 10
-- UPDATE pokemon
-- SET weight = 10
-- -- WHERE name= 'Pikachu';  careful that name might not be unique
-- WHERE id=1;

-- SELECT * FROM pokemon;

-- -- UPDATE charmander to charmeleon and its weight
-- UPDATE pokemon
-- SET
--     name = 'Charmeleon',
--     weight = 45
-- WHERE id=2;

-- SELECT * FROM pokemon;

-- -- DELETE
-- DELETE FROM pokemon
-- WHERE id=3;

-- SELECT * FROM pokemon;

-- -- INSERT
-- INSERT INTO pokemon (name, type, weight)
--     VALUES ('Squirtle', 'water', 12);

-- SELECT * FROM pokemon;

-- DELETE THE WHOLE pokemon TABLE - scary!
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY,
    name TEXT,
    type TEXT,
    weight INTEGER,
    deck_id INTEGER REFERENCES decks(id)
);

CREATE TABLE IF NOT EXISTS decks(
    id INTEGER PRIMARY KEY,
    title TEXT
);

INSERT INTO decks (title)
VALUES
    ('Hot'),
    ('Cold')
;

SELECT * FROM decks;

INSERT INTO pokemon (name, type, weight, deck_id)
VALUES
  ('Pikachu', 'lightning', 13, 1),
  ('Squirtle', 'water', 20, 2),
  ('Charmander', 'fire', 19, 1),
  ('Magikarp', 'water', 11, null)
;

SELECT * FROM pokemon;

-- READ
SELECT name, type FROM pokemon;

-- JOINS

-- LEFT JOIN - show ALL pokemon and their decks in a table
-- SELECT name, type, title shorthand
SELECT pokemon.name, type, decks.title
FROM pokemon
LEFT JOIN decks
ON pokemon.deck_id = decks.id;

-- INNER JOIN - show only pokemon with a deck in a table
SELECT pokemon.name, type, decks.title
FROM pokemon
INNER JOIN decks
ON pokemon.deck_id = decks.id;

-- another example for joins

CREATE TABLE IF NOT EXISTS trainers(
    id INTEGER PRIMARY KEY,
    name TEXT,
    pokemon_id INTEGER REFERENCES pokemon(id)
);

INSERT INTO trainers (name, pokemon_id)
VALUES
    ('David', 1),
    ('Damien', 2),
    ('Phong', 3),
    ('Dustin', null)
;

SELECT * FROM trainers;

-- LEFT JOIN
SELECT trainers.name, pokemon.name, pokemon.type
FROM trainers
LEFT JOIN pokemon
ON trainers.pokemon_id = pokemon.id;

-- INNER JOIN
SELECT trainers.name, pokemon.name, pokemon.type
FROM trainers
INNER JOIN pokemon
ON trainers.pokemon_id = pokemon.id;

-- JOIN (defaults to INNER JOIN)
SELECT trainers.name, pokemon.name, pokemon.type
FROM trainers
JOIN pokemon
ON trainers.pokemon_id = pokemon.id;

-- MANY TO MANY RELATIONSHIP

-- Create the badges table
CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY,
    name TEXT
);

-- Insert some badges
INSERT INTO badges (name)
VALUES
    ('Boulder Badge'),
    ('Cascade Badge'),
    ('Thunder Badge')
;

-- Create trainer_badges join table
CREATE TABLE IF NOT EXISTS trainer_badges (
    trainer_id INTEGER REFERENCES trainers(id),
    badge_id INTEGER REFERENCES badges(id),
    PRIMARY KEY (trainer_id, badge_id)
);

-- Insert trainer_badges relationships
INSERT INTO trainer_badges (trainer_id, badge_id)
VALUES
    (1, 1), -- David earns Boulder Badge
    (1, 2), -- David earns Cascade Badge
    (2, 3), -- Damien earns Thunder Badge
    (3, 1)  -- Phong earns Boulder Badge
;

-- Query to demonstrate the many-to-many relationship
SELECT trainers.name AS trainer_name, badges.name AS badge_name
FROM trainers
JOIN trainer_badges ON trainers.id = trainer_badges.trainer_id
JOIN badges ON trainer_badges.badge_id = badges.id;

