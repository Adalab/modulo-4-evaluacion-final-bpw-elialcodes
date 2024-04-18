// Previamente hemos hecho en la terminal:
// npm init (para iniciar un proyecto de node)
// npm install (para descargar la carpeta node modules)
// npm install express (para descargarnos el módulo express y que se nos carguen las dependencias automáticamente en el package.json)
// npm install cors (para descargarnos el módulo cors y que se nos carguen las dependencias automáticamente en el package.json)
// npm installa path (para descargarnos el módulo path y que se nos carguen las dependencias automáticamente en el package.json)
// npm install mysql2 (para descargar el módulo para conectar con MySQL y que se nos carguen las dependencias automáticamente en el package.json)
// en el archivo package.json hemos hecho cambios en ruta relativa (para que sea src/index.js) y unos scripts nuevos para ejecutar
// el archivo ("start": "node src/index.js", "dev": "nodemon src/index.js")

//1. Importamos los modulos de NPM que necesitamos:
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// si fuera necesario: const path = require('path');
// si fuera necesario, para configurar el servidor y poder utilizar variables de entorno: require('dotenv').config();

//2. Creamos el servidor a partir del módulo importado, aquí lo llamamos server, pero se puede llamar app:
const server = express();

//3. Configuramos el servidor que acabamos de crear, le decimos que va a usar:
server.use(express.json({ limit: '25mb' })); //el módulo express parseará las peticiones a archivos json y dichas peticiones tendrán un límite de 25mb
server.use(cors()); //usará el módulo cors

//4. Conexión con una BD:
// Creamos una función async para realizar conexión con una base de datos MySQL:
// await: espera a establecer la conexion configurada con los parametros que le pasamos (los parámetros que pasamos
// es un objeto con host, nombre de db, user, password)
// Como último paso, nos devolverá la conexión:

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost', //cuando estemos en local será siempre localhost
    database: 'nombre-base-datos', //nombre de la BD
    user: process.env.DB_USER, //nombre del usuario
    password: process.env.DB_PASSWORD, //si existe, si es BD de la web freeDataBase existe contraseña seguro.
  });
  connection.connect();
  return connection;
}

//5. Constituimos el puerto y lo inicializamos:
const port = process.env.PORT;
server.listen(port, () => {
  console.log('Server is listening in http://localhost' + port);
});

//6. Consultas a la base de datos dentro de ENDPOINTS, habrá un endpoint para cada tipo de consulta que queramos (GET, POST, DELETE, PUT...)

// 6.1 Consulta a la base de datos para TRAER datos (GET):
// A) ponemos el nombre de nuestro servidor, seguido del método
// B) como primer parámetro configuramos el endpoint '/adalab/api/users' (puede ser lo que queramos, pero por convención está bien que haga
//    referencia a la palabra "api") para que, cuando alguien envía una solicitud a este endpoint, el servidor esté programado para
//    responder enviando información sobre unos usuarios en formato json.
//    Por ejemplo, la ruta del endpoint sería algo así como "dominio/api/students", pero si en vez del dominio estamos con localhost, este no se define en el endpoint,
//    ponemos directamente "api/students".
// C) a continuación como segundo parámetro pasamos una función asíncrona con los parámetros req y res:
//    - req es una abreviatura para referirse al objeto de la petición (request object) en un servidor web:
//      cuando alguien realiza una solicitud a un servidor (acceder a una página web o se enviar datos desde una aplicación),
//      esa solicitud viene acompañada de cierta información que el servidor utiliza para entender y procesar la solicitud del usuario.
//      El objeto req contiene toda esta información.
//    - res el el objeto que contiene la respuesta a la petición y la vamos a obtener directamente de la BD haciendo una query (previamente
//      puede estar bien ejectemos la query en el workbench de MySQL para ver que funcione)
// D) dentro del try ponemos el código que queremos proteger
// E) dentro del catch ponemos un mensaje si lo del try falla, es para errores no controlados (500, los procedentes del servidor), que no dependen de nosotros

server.get('/adalab/api/student', async (req, res) => {
  try {
    const connection = await getConnection(); //creamos una conexión con la función que acabamos de definir en el paso 4
    let sql = 'SELECT * FROM nombre-TABLA WHERE loQueSea=?'; //creamos la query (consulta) indicando el nombre de la tabla (no de la BD) y la condición con ? sustituyendo a la parte dinámica
    const [results] = await connection.query(sql); //recogemos los resultados: ejecutamos la query y siempre devuelve 2 arrays (los resultados y más información de la BD que no nos interera), pues bien, SOLO nos interesa results (el primer array, que tendrá dentro objetos, uno por cada registro de la tabla)

    // la linea de arriba está con destructuring, se podría escribir esto, pero son más líneas de código:
    //  const resultQuery= await connection.query(sql);
    //  const projectResult= resultQuery[0];

    connection.end(); //cerramos la conexión con MySQL
    res.status(201).json({ status: 'sucess', message: results }); //enviamos la respuesta, que es un objeto con el estado de la consulta y con los resultados
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ha habido un error interno',
    });
  }
});

// 6.2 Consulta a la base de datos para INSERTAR unos datos a la base de datos (datos implícitos en los paramas,
// en concreto unos body params que habriamos pasado en el fetch del frontend):

// 6.2.1 Previamente declaramos una función (no la llamamos todavía) para comprobar que uno de esos datos, el mail, no existe en la BD:

async function isEmailDuplicated(connection, email) {
  const sql = 'SELECT * FROM students WHERE email = ?'; //con la interrogación indicamos la parte dinámica de la sentencia sql
  const [resultEmail] = await connection.query(sql, [email]);
  if (resultEmail.length === 0) {
    return false;
  } else {
    return true;
  }
}

// 6.2.2 Ahora si añadimos los datos a nuestra BD creando otro endpoint:

server.post('/adalab/api/student', async (req, res) => {
  const connection = await getConnection(); //creamos una conexión a la BD con la función que acabamos de definir en el paso 4

  const isEmailInUse = await isEmailDuplicated(connection, req.body.mail); //llamamos a función para ver si el email existe, con los parámentros conection y req.body.mail

  //condicional por si el email ya existe en nuestra BD:
  if (isEmailInUse) {
    res.status(400).json({
      status: 'error',
      message: 'The email is already in use',
    });
  } else {
    const sql = 'INSERT INTO students (name, lastname, age, email) VALUES(?, ?, ?, ?)'; //declaramos la query, como si la hicieramos en MySQL Workbench, como values ponemos de momento ? y a continuación le pasamos los values
    const [result] = await connection.query(sql, [
      //pasamos como VALUES en la query para ejecutarla y ahora ya si con los valores que van implícitos en el req.body (son body params)
      req.body.name,
      req.body.lastname,
      req.body.age,
      req.body.mail,
    ]);
    connection.end(); //cerramos la conexión con MySQL
    res.status(201).json({
      status: 'success',
      id: result.insertId, //esto es información para el front-end y este insertId lo devuelve por defecto el paquete mysql2, es como result.id
    });
  }
});

//7. Entramos en http://localhost:3000/users desde Chrome para ver la respuesta del servidor

//8. Programamos los ficheros estáticos:
const staticServer = './web'; //ruta relativa de la raíz del proyecto
server.use(express.static(staticServer)); //le decimos al servidor que use un servidor estático y le indicamos la ruta

//EN FRONT:
// - pedir los datos al servidor (en app, con useeffect, variable de estado y el fetch)
// - pintar los datos con la variable de estado
