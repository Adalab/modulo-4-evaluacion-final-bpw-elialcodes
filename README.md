GESTIONAR LOS RECURSOS DE UNA BIBLIOTECA:

Este proyecto consiste en simular a pequeña escala cómo podría se la gestión de recursos de una biblioteca.
Para ello hemos diseñado un servidor utilizando Express.js, que estará vinculado a una base de datos MySQL
en la que se encuentran registrados los libros.

Se han diseñado y creado endpoints para poder realizar las siguientes acciones CRUD (create, read, update, delete):

1. GET "/api/books" , este endpoint devuelve una lista de todos los libros disponibles en la biblioteca.
  
2. POST "/api/newbook" , permite agregar un nuevo libro a la colección. Se debe proporcionar la información del libro en el
  cuerpo de la solicitud en formato JSON. Ejemplo:

    {
      "titulo": "El Señor de los Anillos",
      "autor": "J.R.R. Tolkien",
      "genero": "Fantasía",
      "anio_publicacion": 1954
    }

3. PUT "/api/book/:id" , permite actualizar la información de un libro existente identificado por su ID. Se debe proporcionar el ID del libro 
  a actualizar en la URL y la nueva información del libro en el cuerpo de la solicitud en formato JSON. Ejemplo de url y de JSON:

    "/api/book/2"

     {
       "year":"2018",
       "pages":"568"
     }
  
5. DELETE "/api/book/?id" , permite eliminar un libro existente de la colección mediante su ID. Ejemplo de url:

    "/api/book/4"

Para comprobar el funcionamiento del servidor y los endpoints, se recomienda utilizar Postman, y así probar la API diseñada.

Tecnologías Utilizadas
Servidor: Express.js
Base de Datos: MySQL
Herramienta de Pruebas: Postman

¡Gracias por utilizar este proyecto para la gestión de libros con Express.js y MySQL! 


