-- Dit is de file voor de database queries die je kunt importeren in xampp of een andere database
CREATE DATABASE metaload;
USE metaload;

-- Table: attachments
CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(100)
);

-- Table: guns
CREATE TABLE guns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    game VARCHAR(100),
    user VARCHAR(100)
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100)
);

-- Insert attachments
INSERT INTO attachments VALUES
(1, 'Compensator', 'Muzzle'),
(2, 'Willis 3x', 'Optic'),
(3, 'Extended Mag ||', 'Magazine'),
(4, 'Vertical Foregrip', 'Underbarrel'),
(5, 'Gain-Twist Barrel', 'Barrel');

-- Insert guns
INSERT INTO guns VALUES
(1, 'AMES 85', 'Black Ops 6', 'MetaLoad'),
(2, 'Cypher 91', 'Black Ops 6', 'MetaLoad'),
(3, 'C9', 'Black Ops 6', 'MetaLoad');

-- Insert gun-attachment relationships
INSERT INTO guns_attachments VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2);
