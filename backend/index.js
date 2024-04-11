const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
 

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify a folder to temporarily store uploaded files


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
// API endpoint for user registration
app.post('/register', (req, res) => {
    const { phoneNumber, name, pincode, state, city, address } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Insert new user into the database
        db.query('INSERT INTO newcustomers (phoneNumber, name, pincode, state, city, address) VALUES (?, ?, ?, ?, ?, ?)',
            [phoneNumber, name, pincode, state, city, address],
            (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'User registered successfully' });
            });
    });
});

app.post('/checkPhoneNumber', (req, res) => {
  const { phoneNumber } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
      if (err) {
          console.error('Error checking user existence:', err);
          return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length > 0) {
          return res.status(400).json({ message: 'Phone number already exists' });
      }
      // If phone number doesn't exist, return success
      return res.status(200).json({ message: 'Phone number available' });
  });
});

const saveImage = (base64String, filename) => {
    const filepath = path.join(__dirname, 'uploads', filename);
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filepath, buffer);
    return filepath;
};


// API endpoint for shopkeeper registration
 
app.post('/shopkeeperRegister', (req, res) => {
    const { phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory } = req.body;
    // Insert new shopkeeper into the database
    db.query('INSERT INTO shopkeepers (phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory],
        (err, result) => {
            if (err) {
                console.error('Error registering shopkeeper:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Shopkeeper registered successfully' });
        });
});

 



const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});