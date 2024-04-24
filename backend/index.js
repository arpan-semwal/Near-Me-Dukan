const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
 

const multer = require('multer');
const path = require('path');


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
    const { phoneNumber, name, pincode, state, city, address, shopID } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // If shopID is provided, check if it matches any shopkeeper's phone number
        if (shopID) {
            db.query('SELECT * FROM shopkeepers WHERE phoneNumber = ?', [shopID], (err, shopkeeperResults) => {
                if (err) {
                    console.error('Error checking shopkeeper existence:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
            
                if (shopkeeperResults.length > 0) {
                    // Shopkeeper exists with the provided shopID, determine the type of shop
                    const shopkeeper = shopkeeperResults[0];
                    const selectedCategory = shopkeeper.selectedCategory;
            
                    // Check the category to determine the type of shop
                    if (selectedCategory === 'Salon Shop') {
                        console.log('Salon Shop found');
                        // Add the user to newcustomers database with shopID
                        db.query('INSERT INTO newcustomers (phoneNumber, name, pincode, state, city, address, shop_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                        [phoneNumber, name, pincode, state, city, address, shopID], 
                        (err, result) => {
                            if (err) {
                                console.error('Error registering user:', err);
                                return res.status(500).json({ message: 'Internal server error' });
                            }
                            console.log('User registered successfully');
                            return res.status(200).json({ message: 'User registered successfully', shopType: selectedCategory });
                        });
                    }  
                    else {
                        console.log('Unknown shop type');
                        // Navigate to a default homepage or handle other shop types
                        return res.status(200).json({ message: 'Unknown shop type', shopkeeper });
                    }
                } else {
                    // No shopkeeper found with the provided shopID, return error
                    console.log('Shopkeeper not found');
                    return res.status(404).json({ message: 'Shopkeeper not found' });
                }
            });
        } else {
            // If shopID is not provided, register the user without associating it with any shop
            db.query('INSERT INTO newcustomers (phoneNumber, name, pincode, state, city, address) VALUES (?, ?, ?, ?, ?, ?)', 
            [phoneNumber, name, pincode, state, city, address], 
            (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                console.log('User registered successfully');
                return res.status(200).json({ message: 'User registered successfully', userId: result.insertId });
            });
        }
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
    const {
        phoneNumber,
        shopkeeperName,
        shopID,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory,
        selectedSubCategory,  // Add this line to handle the subcategory
    } = req.body;

    // Insert new shopkeeper into the database
    db.query(
        'INSERT INTO shopkeepers (phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',  // Update query to include selectedSubCategory
        [phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory],  // Add selectedSubCategory in the array
        (err, result) => {
            if (err) {
                console.error('Error registering shopkeeper:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Shopkeeper registered successfully' });
        }
    );
});


app.get('/categories', (req, res) => {
    db.query('SELECT * FROM nkd.category', (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

app.get('/subcategories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    console.log('Category ID:', categoryId); // Log the categoryId

    // Fetch sub-categories from the database based on the category ID
    db.query('SELECT * FROM nkd.tbl_salon_subcategory WHERE category_id = ?', [categoryId], (err, results) => {
        if (err) {
            console.error('Error fetching sub-categories:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        console.log('Results:', results); // Log the results
        res.status(200).json(results);
    });
});

app.get('/shopkeeperDetails/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Fetch shopkeeper details from the database based on the phone number
    db.query(
        'SELECT shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory FROM shopkeepers WHERE phoneNumber = ?',
        [phoneNumber],
        (err, results) => {
            if (err) {
                console.error('Error fetching shopkeeper details:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Shopkeeper not found' });
            }
        }
    );
});
 
app.get('/services/subcategory/:subcategory', (req, res) => {
    const subcategory = req.params.subcategory;

    // Log the subcategory parameter for debugging
    console.log('Received subcategory parameter:', subcategory);

    // Query the database for services based on the subcategory
    db.query('SELECT * FROM nkd.tbl_salon_main_services WHERE sub_category_id = ?', [subcategory], (err, results) => {
        if (err) {
            console.error('Error fetching services:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});


app.get('/subservices/mainservice/:mainServiceId', (req, res) => {
    const mainServiceId = req.params.mainServiceId;
  
    // Query the database for sub-services based on main service ID
    db.query('SELECT * FROM nkd.tbl_salon_sub_sub_services WHERE main_service_id = ?', [mainServiceId], (err, results) => {
      if (err) {
        console.error('Error fetching sub-services:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  
  

  app.post('/shopkeeper/selectedSubServices', (req, res) => {
    const { phoneNumber, selectedServices } = req.body;

    const insertQuery = `INSERT IGNORE INTO sub_selected_services (phoneNumber, subServiceId) VALUES ?`;
    const values = selectedServices.map(subServiceId => [phoneNumber, subServiceId]);

    db.query(insertQuery, [values], (err, results) => {
        if (err) {
            console.error('Error saving selected services:', err);
            res.status(500).json({ message: 'Error saving selected services', error: err });
        } else {
            res.json({ message: 'Sub-services saved successfully' });
        }
    });
});


// Endpoint to retrieve selected services for a shopkeeper
app.get('/shopkeeper/selectedSubServices/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Query to fetch selected sub-services and their main service information
    const query = `
    SELECT m.id AS mainServiceId, m.name AS mainServiceName, sss.id, sss.name, sss.price
    FROM sub_selected_services sssv
    JOIN tbl_salon_sub_sub_services sss ON sssv.subServiceId = sss.id
    JOIN tbl_salon_main_services m ON sss.main_service_id = m.id
    WHERE sssv.phoneNumber = ?;
`;

    db.query(query, [phoneNumber], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving selected services', error: err });
        } else {
            res.json(results);
        }
    });
});



app.get('/searchServices', (req, res) => {
    const { query } = req.query; // Get the search query from the request query parameters

    // Query the database for services matching the search query
    db.query(
        'SELECT * FROM nkd.tbl_salon_main_services WHERE name LIKE ? OR description LIKE ?',
        [`%${query}%`, `%${query}%`],
        (err, results) => {
            if (err) {
                console.error('Error fetching services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            // Send the results back to the client
            res.status(200).json(results);
        }
    );
});


app.get('/shopkeeperDetails/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Fetch shopkeeper details from the database based on the phone number
    db.query(
        'SELECT shopkeeperName, pincode, shopState, city, address FROM shopkeepers WHERE phoneNumber = ?',
        [phoneNumber],
        (err, results) => {
            if (err) {
                console.error('Error fetching shopkeeper details:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Shopkeeper not found' });
            }
        }
    );
});
  

 
  

app.get('/shop/:shopID', (req, res) => {
    const shopID = req.params.shopID;

    // Query the database to fetch shop details based on shopID
    db.query(
        'SELECT * FROM shopkeepers WHERE phoneNumber = ?',
        [shopID],
        (err, result) => {
            if (err) {
                console.error('Error fetching shop details:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Shop not found' });
            }

            const shopDetails = {
                id: result[0].id,
                phoneNumber: result[0].phoneNumber,
                shopkeeperName: result[0].shopkeeperName,
                shopID: result[0].shopID,
                pincode: result[0].pincode,
                shopState: result[0].shopState,
                city: result[0].city,
                address: result[0].address,
                salesAssociateNumber: result[0].salesAssociateNumber,
                selectedCategory: result[0].selectedCategory,
                shopBanner: result[0].shopBanner,
                profilePicture: result[0].profilePicture,
                registrationDate: result[0].registrationDate,
                selectedSubCategory: result[0].selectedSubCategory,
            };

            res.status(200).json(shopDetails);
        }
    );
});

app.get('/salons', (req, res) => {
    const { shopID } = req.query;

    // Query the database to fetch salon shops
    db.query(
        'SELECT * FROM shopkeepers WHERE selectedCategory = ?',
        ['Salon Shop'],
        (err, results) => {
            if (err) {
                console.error('Error fetching salon shops:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'No salon shops found' });
            }

            // Move shop with customer's shopID to the top
            const customerShopIndex = results.findIndex(shop => shop.phoneNumber === shopID);
            console.log('Customer shop index:', customerShopIndex);
            if (customerShopIndex !== -1) {
                const customerShop = results.splice(customerShopIndex, 1)[0];
                console.log('Customer shop:', customerShop);
                results.unshift(customerShop);
            }

            console.log('Modified results:', results);

            res.status(200).json(results);
        }
    );
});




  
  
  
  
  





 



const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
}); 