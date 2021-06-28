const express = require('express');
const { db } = require('./conf');

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const sql = 'SELECT * FROM users';
  const [results] = await db.query(sql);
  res.json(results);
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(5050, () => {
  console.log('Terra Battle API now available on http://localhost:5050 !');
});

Envoyer un message à @[Lille] Robin Delannoy