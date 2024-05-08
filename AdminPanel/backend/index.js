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

 

// Route to add a new shopkeeper
app.post('/shopkeepers', (req, res) => {
  const { shopkeeperName, phoneNumber, address, city, shopState, pincode, selectedCategory , shopID } = req.body;
  const sql = 'INSERT INTO nkd.shopkeepers (shopkeeperName, phoneNumber, address, city, shopState, pincode, selectedCategory , shopID) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  db.query(sql, [shopkeeperName, phoneNumber, address, city, shopState, pincode, selectedCategory,shopID], (err, result) => {
    if (err) {
      console.error('Error adding shopkeeper:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Shopkeeper added successfully');
    res.status(200).json({ message: 'Shopkeeper added successfully' });
  });
});


// Route to get all categories
// Route to add a new category
app.post('/categories', (req, res) => {
  const { name, type } = req.body;
  const sql = 'INSERT INTO nkd.category (name, type) VALUES (?, ?)';
  
  // Check if type parameter exists
  if (type) {
      db.query(sql, [name, type], (err, result) => {
          if (err) {
              console.error('Error adding category:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
          }
          console.log('Category added successfully');
          res.status(200).json({ message: 'Category added successfully' });
      });
  } else {
      db.query(sql, [name], (err, result) => {
          if (err) {
              console.error('Error adding category:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
          }
          console.log('Category added successfully');
          res.status(200).json({ message: 'Category added successfully' });
      });
  }
});

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



//Add sales exucutive
app.post('/sales-executives', (req, res) => {
    const { mobileNo, firstName, lastName, pincode, upi, pancard, aadhar } = req.body;
    const sql = 'INSERT INTO tbl_salesexecutives (mobileNo, firstName, lastName, pincode, upi, pancard, aadhar) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [mobileNo, firstName, lastName, pincode, upi, pancard, aadhar], (err, result) => {
      if (err) {
        console.error('Error adding sales executive:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Sales executive added successfully');
      res.status(200).json({ message: 'Sales executive added successfully' });
    });
  });
  
  app.get('/sales-executives', (req, res) => {
    const sql = 'SELECT * FROM tbl_salesexecutives';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Sales Associates:', result);
      res.json(result);
    });
  });
  
  //update sales associate
  app.get('/sales-executives/:mobileNo', (req, res) => {
    const mobileNo = req.params.mobileNo;
    const sql = 'SELECT * FROM tbl_salesexecutives WHERE mobileNo = ?';
    db.query(sql, [mobileNo], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'Sales associate not found' });
        return;
      }
      console.log('Sales Associate:', result[0]);
      res.json(result[0]);
    });
  });
  
  app.put('/sales-executives/:mobileNo', (req, res) => {
    const { firstName, lastName, pincode, upi, pancard, aadhar } = req.body;
    const mobileNo = req.params.mobileNo;
    const sql = 'UPDATE tbl_salesexecutives SET firstName=?, lastName=?, pincode=?, upi=?, pancard=?, aadhar=? WHERE mobileNo=?';
    db.query(sql, [firstName, lastName, pincode, upi, pancard, aadhar, mobileNo], (err, result) => {
      if (err) {
        console.error('Error updating sales executive:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Sales executive updated successfully');
      res.status(200).json({ message: 'Sales executive updated successfully' });
    });
  });



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
