CREATE DATABASE bookshop;

USE bookshop;

CREATE TABLE books(
	id int auto_increment primary key,
    title VARCHAR(60),
    author VARCHAR(60),
    year INT,
    pages INT,
    topic VARCHAR(40),
    stock INT
);

INSERT INTO books (title, author, year, pages, topic, stock)
VALUES("El jardín olvidado", "Kate Morton", 2010/04/19, 544, "Drama", 5),
("Mil soles espléndidos", "Khaled Hosseini", 2007/05/22, 384, "Drama", 6),
("Cien años de soledad", "Gabriel García Márquez", 1967/05/23, 496, "Novela Hispanoamericana", 10),
("La novia gitana", "Carmen Mola", 2018/05/17, 408, "Policíaca", 2)