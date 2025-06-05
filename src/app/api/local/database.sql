-- Create the database (run this separately if you're using a GUI like pgAdmin)
CREATE DATABASE metaload;

-- Connect to the database
\c metaload;

-- Table: attachments
CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(100)
);

-- Table: guns
CREATE TABLE guns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    game VARCHAR(100),
    "user" VARCHAR(100),
    photos VARCHAR(100)
);

-- Table: guns_attachments
CREATE TABLE guns_attachments (
    gun_id INT,
    attachment_id INT,
    PRIMARY KEY (gun_id, attachment_id),
    FOREIGN KEY (gun_id) REFERENCES guns(id) ON DELETE CASCADE,
    FOREIGN KEY (attachment_id) REFERENCES attachments(id) ON DELETE CASCADE
);

-- Table: tier
CREATE TABLE tier (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

-- Step 3: Insert attachments
INSERT INTO attachments (name, type) VALUES
('Compensator', 'Muzzle'),
('Willis 3x', 'Optic'),
('Extended Mag ||', 'Magazine'),
('Vertical Foregrip', 'Underbarrel'),
('Gain-Twist Barrel', 'Barrel'),
('Volzhsky Reflex', 'Optic'),
('Commando Grip', 'Rear Grip'),
('Long Barrel', 'Barrel'),
('Ranger Foregrip', 'Underbarrel');

-- Step 4: Insert guns
INSERT INTO guns (name, game, "user", photos) VALUES
('AMES 85', 'Black Ops 6', 'MetaLoad', 'ames85.avif'),
('Cypher 91', 'Black Ops 6', 'MetaLoad', 'cypher91.avif'),
('C9', 'Black Ops 6', 'MetaLoad', 'c9.avif');

-- Step 5: Insert gun-attachment relationships
INSERT INTO guns_attachments (gun_id, attachment_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 6),
(2, 7),
(3, 1),
(3, 3),
(3, 7);