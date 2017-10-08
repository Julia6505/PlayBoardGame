DROP DATABASE IF EXISTS games_db;
CREATE DATABASE games_db;
USE games_db;

CREATE TABLE newgames (
id INT NOT NULL AUTO_INCREMENT,
newgame VARCHAR(255) NOT NULL, 
PRIMARY KEY (id)
);

CREATE TABLE playedgames (
    id INT NOT NULL AUTO_INCREMENT,
    playedgame VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
);

INSERT INTO newgames (newgame) VALUES ("Connect 4");
INSERT INTO newgames (newgame) VALUES ("Twister");

INSERT INTO playedgames (playedgame) VALUES ("Scattergories");
INSERT INTO playedgames (playedgame) VALUES ("UNO");