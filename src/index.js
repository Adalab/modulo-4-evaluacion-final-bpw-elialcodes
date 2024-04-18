const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
//require('dotenv').config();

const server = express();

server.use(express.json({ limit: '25mb' }));
server.use(cors());

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

const port = process.env.PORT;
server.listen(port, () => {
  console.log('Server is listening in http://localhost' + port);
});
