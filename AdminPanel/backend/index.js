const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noodle@123',
  database: 'nkd'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
 
 
 

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
