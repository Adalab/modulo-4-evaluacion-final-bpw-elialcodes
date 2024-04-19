GESTIONAR LOS RECURSOS DE UNA BIBLIOTECA:

Este proyecto consiste desarrolar una api que simula a pequeña escala cómo podría ser la gestión de recursos de una biblioteca.
Para ello hemos diseñado unos endpoints y un servidor utilizando Express.js, el cual estará vinculado a una base de datos MySQL en la que se encuentran registrados libros y usuarios.

Pasos de configuración si se desea probar esta api:
Es necesario tener instalado previamente node.js, MySQL y la interfaz gráfica MySQL Workbench.
Configuración de tu editor de código en la terminal:

- npm init => para iniciar el proyecto, se debe seguir sus indicaciones de configuración
- npm install => para instalar la carpeta node_modules, donde se guardarán los módulo siguientes a importar
- npm install express => para instaler Express JS, nuestro servidor
- npm install cors => para permitir peticiones a un recurso alojado en otro origen
- npm start => para arrancar el servidor
- npm install mysql2 => para poder conectar el servidor a la base de datos de MySQL

Se han diseñado y creado endpoints para poder realizar las siguientes acciones CRUD (create, read, update, delete):

1. GET: "/api/books",

   - este endpoint devuelve una lista con todos los libros de la biblioteca

2. GET: "/api/books/:id"

   - este endpoint devuelve un libro de la biblioteca según su id
   - se debe proporcionar el ID del libro en la url, ejemplo de url: "/api/books/2"
   - si no encuentra ningún libro con ese id, devuelve un mesaje de error:
     status: 404; error:'No existe ningún libro con ese id'.

3. POST: "/api/newbook"

   - permite agregar un nuevo libro a la colección
   - se debe proporcionar la información del libro en el cuerpo de la solicitud en formato JSON. Ejemplo:

     {
     "title": "Reina Roja",
     "author":"Juan Gómez-Jurado",
     "year":"2018",
     "pages":"568"
     }

   - los datos de title y author son obligatorios, si no se envían se devuelve un mensaje de error:
     status: 404; error:'Faltan datos para añadir el libro'.
   - si el libro se ha añadido correctamente, devuelve un mensaje:
     success: true; message: 'El libro ha sido añadido correctamente',

4. PUT: "/api/books/:id"

   - permite actualizar la información de un libro existente identificado por su ID
   - se debe proporcionar el ID del libro en la url, ejemplo de url: "/api/books/2"
   - la nueva información del libro irá en el cuerpo de la solicitud en formato JSON. Ejemplo:

   {
   "year":"2018",
   "pages":"568"
   }

   - si no encuentra ningún libro con ese id, devuelve un mesaje de error:  
      status: 404; error:'No existe ningún libro con ese id'.

   - si los datos ha actualizar ya existen en el libro, devuelve un mensaje:
     status: 404; message:'Esos datos ya existen en el libro'.

5. DELETE "/api/books/"

   - permite eliminar un libro existente de la colección mediante su ID, ejemplo de url: "/api/books/?=4"
   - si el libro no se encuentra en la base de datos se devuelve un mensaje de error:
     success: false; error: 'No existe ningún libro con ese id',

Para comprobar el funcionamiento del servidor y los endpoints, se recomienda utilizar Postman, y así probar la API diseñada.

Tecnologías Utilizadas
Servidor: Express.js
Base de Datos: MySQL
Herramienta de Pruebas: Postman

¡Gracias por ver y utilizar este proyecto para la gestión de libros con Express.js y MySQL!
