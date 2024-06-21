const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3001;
require('dotenv').config();
const multer = require('multer');
const path = require('path');
 


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


//const db = mysql.createPool({
//  host:'localhost',  // Replace with your MySQL host IP address or hostname
//  user:'root', // Replace with your MySQL username
//  password:'Noodle@123', // Replace with your MySQL password
//  database:'nkd' // Replace with your MySQL database name
//});

 

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from /uploads
 

//const db = mysql.createConnection({
//  host: '172.16.16.19', // Replace 'your_hostinger_mysql_host' with the hostname provided by Hostinger
//  user: 'u365766400_arpan',        // Replace 'your_mysql_username' with your MySQL username
//  password: 'Noodle@123#123',    // Replace 'your_mysql_password' with your MySQL password
//  database: 'u365766400_near_ki_dukan'     // Replace 'your_mysql_database' with your MySQL database name
//});


// Connect to MySQL
db.getConnection(err => {
	if (err) {
	  console.error('Error connecting to MySQL',err);
	  return;
	}
	console.log('Connected to MySQL database');
  });

app.use(cors());
// Middleware for parsing JSON bodies
app.use(bodyParser.json());



app.get('/phone-number', (req, res) => {
  // Query to fetch admin phone number
  const sql = 'SELECT adminPhoneNumber FROM admins LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.length === 1) {
      // Admin phone number found, send it
      res.json({ phoneNumber: result[0].adminPhoneNumber });
    } else {
      // Admin phone number not found
      res.status(404).json({ error: 'Admin phone number not found' });
    }
  });
});



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
  
  
  
  
  
  
  
  

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  
  
  // Route to get all products
  const upload = multer({ storage: storage });

  // GET all products
  app.get('/products', (req, res) => {
    const sql = 'SELECT id, main_category, product_name, brand_name, precise_brand_name, price, weight, weight_type, type, picture_path FROM tbl_product_master';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Products:', result);
      res.json(result);
    });
  });
  
  // POST to add a product
  app.post('/products/add', upload.single('picture'), (req, res) => {
    const { main_category, product_name, brand_name, precise_brand_name, price, weight, weight_type, type } = req.body;
    const picture_path = req.file ? '/uploads/' + req.file.filename : null;
  
    const sql = 'INSERT INTO tbl_product_master (main_category, product_name, brand_name, precise_brand_name, price, weight, weight_type, type, picture_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [main_category, product_name, brand_name, precise_brand_name, price, weight, weight_type, type, picture_path], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Failed to add product' });
      }
      console.log('Product added successfully');
      res.json({ message: 'Product added successfully' });
    });
  });
// Route to get all sales executives with hierarchy information
app.get('/sales_executives_team', (req, res) => {
  const sql = `
      SELECT 
          se.id, 
          se.mobileNo, 
          se.firstName, 
          se.lastName, 
          se.pincode, 
          se.upi, 
          se.pancard, 
          se.aadhar, 
          se.addedBy, 
          se.commission, 
          se.level,
          se.teamLeaderId,
          se.addedById,
          t.teamLeaderName,
          a.addedByName
      FROM nkd.tbl_salesexecutives se
      LEFT JOIN (
          SELECT id, CONCAT(firstName, ' ', lastName) AS teamLeaderName FROM tbl_salesexecutives
      ) t ON se.teamLeaderId = t.id
      LEFT JOIN (
          SELECT id, CONCAT(firstName, ' ', lastName) AS addedByName FROM tbl_salesexecutives
      ) a ON se.addedById = a.id
  `;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      console.log('Sales Executives:', result); // Log the result
      res.json(result);
  });
});

app.put('/commission_rates', (req, res) => {
  const commissionRates = req.body;
  
  // Begin transaction
  db.beginTransaction(err => {
    if (err) {
      console.error('Error beginning transaction:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Update commission rates in database
    const updatePromises = commissionRates.map(rate => {
      return new Promise((resolve, reject) => {
        const sql = 'UPDATE tbl_commission_rate SET amount = ? WHERE commissionType = ?';
        db.query(sql, [rate.amount, rate.commissionType], (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        // Commit transaction if all updates succeed
        db.commit(err => {
          if (err) {
            console.error('Error committing transaction:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          console.log('Commission rates updated successfully');
          res.json({ message: 'Commission rates updated successfully' });
        });
      })
      .catch(error => {
        // Rollback transaction if any update fails
        db.rollback(() => {
          console.error('Error updating commission rates:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
      });
  });
});






// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
