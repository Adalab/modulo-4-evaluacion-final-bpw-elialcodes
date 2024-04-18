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
    password: process.env.DB_PASSWORD,
  });

  connection.connect();
  return connection;
}

const port = process.env.PORT;
server.listen(port, () => {
  console.log('Server is listening in http://localhost' + port);
});

//Leer/listar todas las entradas existentes:

server.get('/api/books', async (req, res) => {
  const connection = await getConnection();
  const sql = 'SELECT * FROM books';
  const [result] = await connection.query(sql);
  connection.end();

  res.json({
    status: 201,
    result: result,
  });
});
