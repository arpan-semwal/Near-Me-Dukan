const express = require('express');
const mysql = require('mysql');


const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noodle@123',
  database: 'nkd'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM all_states', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
