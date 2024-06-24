const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3002;

const db = mysql.createConnection({
  host: '172.16.16.41',
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

app.use(cors());
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

 


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://172.16.16.41:${port}/`);
});
