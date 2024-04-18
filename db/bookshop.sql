CREATE DATABASE bookshop;

USE bookshop;

CREATE TABLE books(
	id int auto_increment primary key,
    title VARCHAR(60) not null,
    author VARCHAR(60) not null,
    year INT,
    pages INT
);

INSERT INTO books (title, author, year, pages)
VALUES("El jardín olvidado", "Kate Morton", 2010, 544),
("Mil soles espléndidos", "Khaled Hosseini", 2007, 384),
("Cien años de soledad", "Gabriel García Márquez", 1967, 496),
("La novia gitana", "Carmen Mola", 2018, 408)

-- Para probar el endpoint de insertar un nuevo libro a la db:
{
"title": "Reina Roja",
"author":"Juan Gómez-Jurado",
"year":"2018",
"pages":"568"
}

-- Para probar el endpoint de actualizar un libro a la db:
-- {
-- "year":"2018",
-- "pages":"568",
-- }