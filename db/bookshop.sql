CREATE DATABASE bookshop;

USE bookshop;

CREATE TABLE users(
idUser int auto_increment primary key,
name VARCHAR (30) not null,
lastname VARCHAR (40) not null
);

INSERT INTO users (name,lastname)
VALUES("Elena", "Iglesias"),
("Alberto","Lavín"),
("Leo","Fernández"),
("Flor", "Aja"),
("Ana", "Salgado");

CREATE TABLE books(
id int auto_increment primary key,
title VARCHAR(60) not null,
author VARCHAR(60) not null,
year INT,
pages INT,
fkUser INT,
FOREIGN KEY (fkUser) REFERENCES users (idUser)
);

INSERT INTO books (title, author, year, pages)
VALUES("El jardín olvidado", "Kate Morton", 2010, 544),
("Mil soles espléndidos", "Khaled Hosseini", 2007, 384),
("Cien años de soledad", "Gabriel García Márquez", 1967, 496),
("La novia gitana", "Carmen Mola", 2018, 408);
