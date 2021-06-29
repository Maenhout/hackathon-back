
const express = require('express');
const cors = require('cors');
const { db } = require('./conf');

const app = express();
app.use(express.json());
app.use(cors());




app.get('/wantedservice', async (req, res) => {
  const sql = 'SELECT * FROM wantedservice';
  const [results] = await db.query(sql);
  res.json(results);
});

app.get('/wantedservice/:id', async (req, res) => {
  const {id} = req.params;
  const sql = 'SELECT * FROM wantedservice WHERE categoryId=? ';
  let sqlValues =[id]
  const [results] = await db.query(sql,sqlValues);
  console.log(results);
  res.json(results);
});


app.post('/wanted', async (req, res) => {
  const {
    id,
    offer,
    offerCategory,
    offerTitle,
    request,
    requestCategory,
    requestTitle,
  } = req.body;
  console.log(req.body);

  const sql =
    'INSERT INTO wantedservice (usersId, title, categoryId, textWanted) VALUES ( ?, ?, ?, ?)';
  const sqlValues = [id, requestTitle, requestCategory, request];
  await db.query(sql, sqlValues);

  const sql2 =
    'INSERT INTO proposedservice (usersId,title, categoryId, textProposed) VALUES ( ?, ?, ?, ?)';
  const sqlValues2 = [id, offerTitle, offerCategory, offer];
  await db.query(sql2, sqlValues2, (err, results) => {
    console.log(err);
    if (err) res.status(500).send('Error ....');
    else {
      console.log(results);
      res.status(201).json('It worked');
    }
  });
});

app.get('/category', async (req, res) => {
  const sql = 'SELECT * FROM category';
  const [results] = await db.query(sql);
  res.json(results);
});



app.get('/proposedservice', async (req, res) => {
  const sql = 'SELECT * FROM proposedservice';
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


app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});


app.listen(5050, () => {
  console.log(' API now available on http://localhost:5050 !');
});
