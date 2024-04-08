const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noodle@123',
  database: 'nkd'
});

app.use(bodyParser.json());

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// API endpoint for user registration
app.post('/register', (req, res) => {
  const { phoneNumber, name, pincode, state, city, address } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
    if (err) {
      throw err;
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user into the database
    db.query('INSERT INTO newcustomers (name, pincode, state, city, address) VALUES (?, ?, ?, ?, ?)',
      [name, pincode, state, city, address],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: 'User registered successfully' });
      });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
