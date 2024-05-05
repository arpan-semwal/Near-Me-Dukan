const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
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

app.use(cors());
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Route to get all shopkeepers
app.get('/shopkeepers', (req, res) => {
    const sql = 'SELECT * FROM nkd.shopkeepers';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Shopkeepers:', result); // Log the result
        res.json(result);
    });
});

// Route to get all categories
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM nkd.category';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Categories:', result); // Log the result
        res.json(result);
    });
});


// Route to add a new category
app.post('/categories', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO nkd.category (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Category added successfully');
        res.status(200).json({ message: 'Category added successfully' });
    });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
