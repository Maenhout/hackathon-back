const express = require('express');
const { db } = require('./conf');

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const sql = 'SELECT * FROM users';
  const [results] = await db.query(sql);
  res.json(results);
});


app.get('/users/:id', async (req, res) => {
  const {id}=req.params;
  const sql = 'SELECT mail,username,contact FROM users WHERE id=?';
  let sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});



app.post('/users',async(req,res)=>{
  const{ mail,username,contact} =req.body;
  const sql =
  'INSERT INTO users (mail,username,contact) VALUES(?,?,?)'
  let sqlValues = [mail,username,contact];
const[results]= await db.query(sql, sqlValues);
res.status(201).json(results);
});

app.put('/users/:id',async(req,res)=>{
  const {id}=req.params;
  const{ mail,username,contact} =req.body;
  const sql =
  'UPDATE users SET mail=?, username=?, contact=? WHERE id=?';
  let sqlValues = [mail,username,contact,id];
const[results]= await db.query(sql, sqlValues);
res.status(201).json(results);
});

app.delete('/users/:id', async (req, res) => {
  const {id}=req.params;
  const sql = 'DELETE FROM users WHERE id=?';
  let sqlValues = [id];
  const [results] = await db.query(sql, sqlValues);
  res.json(results);
});




app.post('/wantedservice', async (req, res) => {
  const { usersId, categoryId, textWanted } = req.body;
  const sql =
    'INSERT INTO wantedservice (usersId, categoryId, textWanted) VALUES(?,?,?)';
  const sqlValues = [usersId, categoryId, textWanted];

  const [results] = await db.query(sql, sqlValues);
  res.status(201).json(results);
});

app.get('/wantedservice', async (req, res) => {
  const sql = 'SELECT * FROM wantedservice';
  const [results] = await db.query(sql);
  res.json(results);
});

app.post('/proposedservice', async (req, res) => {
  const { usersId, categoryId, textProposed } = req.body;
  const sql =
    'INSERT INTO proposedservice (usersId, categoryId, textProposed) VALUES(?,?,?)';
  const sqlValues = [usersId, categoryId, textProposed];

  const [results] = await db.query(sql, sqlValues);
  res.status(201).json(results);
});

app.get('/proposedservice', async (req, res) => {
  const sql = 'SELECT * FROM proposedservice';
  const [results] = await db.query(sql);
  res.json(results);
});








app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(5050, () => {
  console.log(' API now available on http://localhost:5050 !');
});

