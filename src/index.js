const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const server = express();

server.use(express.json({ limit: '25mb' }));
server.use(cors());

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'bookshop',
    user: 'root',
    //password: process.env.DB_PASSWORD, //si existe, si es BD de la web freeDataBase existe contraseña seguro.
  });
  connection.connect();
  return connection;
}

const port = process.env.PORT;
server.listen(port, () => {
  console.log('Server is listening in http://localhost' + port);
});
