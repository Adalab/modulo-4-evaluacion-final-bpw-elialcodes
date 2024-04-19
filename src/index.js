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

  res.status(201).json({
    success: true,
    result: result,
  });
});

//Leer/listar una entrada determinada:

server.get('/api/books/:id', async (req, res) => {
  const id = req.params.id;

  const connection = await getConnection();
  const sql = 'SELECT * FROM books WHERE id=?';
  const [result] = await connection.query(sql, [id]);
  console.log(result);
  connection.end();

  if (result.length === 0) {
    res.status(404).json({
      success: false,
      error: 'No existe ningún libro con ese id',
    });
  } else {
    res.status(201).json({
      success: true,
      result: result,
    });
  }
});

//Crear/añadir un nuevo elemento:

server.post('/api/newbook', async (req, res) => {
  const data = req.body;
  const { title, author, year, pages } = data;
  const connection = await getConnection();

  if (!data.title || !data.author) {
    res.status(404).json({
      success: false,
      error: 'Faltan datos para añadir el libro',
    });
  } else {
    const sql = 'INSERT INTO books(title, author, year, pages) VALUES (?,?,?,?)';
    const [resultInsert] = await connection.query(sql, [title, author, year, pages]);
    connection.end();

    res.status(201).json({
      success: true,
      message: 'El libro ha sido añadido correctamente',
    });
  }
});

//Actualizar una entrada existente:

server.put('/api/books/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const { year, pages } = newData;

  const connection = await getConnection();
  const sql = 'UPDATE books SET year=?,pages=? WHERE id=?';
  const [result] = await connection.query(sql, [year, pages, id]);
  console.log(result);
  connection.end();

  if (result.affectedRows === 0) {
    res.status(404).json({
      success: false,
      error: 'No existe ningún libro con ese id',
    });
  } else if (result.changedRows === 0) {
    res.status(404).json({ sucess: false, message: 'Esos datos ya existen en el libro' });
  } else {
    res.status(201).json({
      success: true,
      result: 'El libro se ha actualizado correctamente',
    });
  }
});

//Eliminar una entrada existente:

server.delete('/api/books/', async (req, res) => {
  const id = req.query.id;

  const connection = await getConnection();

  const sql = 'DELETE FROM books WHERE id=?';
  const [result] = await connection.query(sql, [id]);
  connection.end();

  if (result.affectedRows === 0) {
    res.status(404).json({
      success: false,
      error: 'No existe ningún libro con ese id',
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'El libro ha sido eliminado',
    });
  }
});
