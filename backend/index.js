const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const crypto = require('crypto');
const multer = require('multer');



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noodle@123',
  database: 'nkd'
});




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// to check weather the number is present in the which database
app.post('/checkPhoneNumber', (req, res) => {
    const { phoneNumber } = req.body;

    // Check if the phone number exists in the shopkeepers table
    db.query('SELECT * FROM shopkeepers WHERE phoneNumber = ?', [phoneNumber], (err, shopkeeperResults) => {
        if (err) {
            console.error('Error checking shopkeeper existence:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if the phone number exists in the newcustomers table
        db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, customerResults) => {
            if (err) {
                console.error('Error checking customer existence:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (shopkeeperResults.length > 0) {
                // Phone number exists in shopkeepers database
                return res.status(400).json({ message: 'Phone number already exists in shopkeepers database' });
            } else if (customerResults.length > 0) {
                // Phone number exists in newcustomers database
                return res.status(400).json({ message: 'Phone number already exists in newcustomers database' });
            } else {
                // Phone number doesn't exist in either database
                return res.status(200).json({ message: 'Phone number available' });
            }
        });
    });
});

app.post('/login', (req, res) => {
    const { userId } = req.body;
    const sessionToken = generateSessionToken(); // Function to generate session token
    const loginTime = new Date();
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 10); // Expires after 10 days

    // Insert session data into the database
    db.query('INSERT INTO sessions (user_id, session_token, login_time, expiration_time) VALUES (?, ?, ?, ?)', 
        [userId, sessionToken, loginTime, expirationTime],
        (err, result) => {
            if (err) {
                console.error('Error creating session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ sessionToken, expirationTime });
        }
    );
});

// Function to generate a session token
function generateSessionToken() {
    // Your session token generation logic here
    return crypto.randomBytes(32).toString('hex');
}




app.post('/logout', (req, res) => {
    const { userId } = req.body;

    // Delete session from the database
    db.query('DELETE FROM sessions WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        console.log('Deleted session:', result); // Log the result of the database operation

        res.status(200).json({ message: 'Logged out successfully' });
    });
});



app.get('/mainServices', (req, res) => {
    const { selectedSubCategory } = req.query;

    db.query('SELECT * FROM tbl_salon_main_services WHERE category = ?', [selectedSubCategory], (err, results) => {
        if (err) {
            console.error('Error fetching main services:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json(results);
    });
});


// You can add this middleware to validate session tokens for protected routes
function authenticateSession(req, res, next) {
    const sessionToken = req.headers.authorization;
    if (!sessionToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate session token from the database
    db.query('SELECT * FROM sessions WHERE session_token = ?', [sessionToken], (err, results) => {
        if (err) {
            console.error('Error validating session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const session = results[0];
        const currentTime = new Date();
        if (currentTime > new Date(session.expiration_time)) {
            // Session expired, delete it from the database
            db.query('DELETE FROM sessions WHERE session_token = ?', [sessionToken], (err, result) => {
                if (err) {
                    console.error('Error deleting expired session:', err);
                }
            });
            return res.status(401).json({ message: 'Session expired' });
        }

        // Attach user ID to the request for further processing
        req.userId = session.user_id;
        next();
    });
}

module.exports = { app, authenticateSession };





 
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
        selectedSubCategory,
    } = req.body;

    // Insert new shopkeeper into the database
    db.query(
        'INSERT INTO shopkeepers (phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory],
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
                // If no results found by phone number, try fetching by shop ID
                db.query(
                    'SELECT shopkeeperName, pincode, shopState, city, address FROM shopkeepers WHERE shopID = ?',
                    [phoneNumber],  // Assuming phoneNumber is actually shopID in this case
                    (err, results) => {
                        if (err) {
                            console.error('Error fetching shopkeeper details:', err);
                            return res.status(500).json({ message: 'Internal server error' });
                        }

                        if (results.length > 0) {
                            res.status(200).json(results[0]);
                        } else {
                            // If no results found by shopID as well
                            res.status(404).json({ message: 'Shopkeeper not found' });
                        }
                    }
                );
            }
        }
    );
});


app.get('/mainServices/:subcategory', (req, res) => {
    const subcategory = req.params.subcategory;

    db.query(
        'SELECT * FROM nkd.tbl_salon_main_services WHERE sub_category_id = (SELECT id FROM tbl_subcategories_salon WHERE name = ?)',
        [subcategory],
        (err, results) => {
            if (err) {
                console.error('Error fetching main services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json(results);
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
    const { phoneNumber, mainServiceName, subServiceName } = req.body;

    // Ensure all required fields are present
    if (!phoneNumber || !mainServiceName || !subServiceName) {
        return res.status(400).json({ message: 'Please provide phoneNumber, mainServiceName, and subServiceName' });
    }

    // Save selected sub-services to the database
    db.query(
        'INSERT INTO nkd.tbl_selected_services (phoneNumber, mainServiceName, subServiceName) VALUES (?, ?, ?)',
        [phoneNumber, mainServiceName, subServiceName],
        (err, result) => {
            if (err) {
                console.error('Error saving selected services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Selected sub-services saved successfully');
            res.status(200).json({ message: 'Selected sub-services saved successfully' });
        }
    );
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

 
 
// Get customer details by phone number
app.get('/customerDetails/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Query the database to fetch customer details based on phone number
    db.query(
        'SELECT name, pincode, shop_id as shopID FROM newcustomers WHERE phoneNumber = ?',
        [phoneNumber],
        (err, result) => {
            if (err) {
                console.error('Error fetching customer details:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No customer found for this phone number' });
            }

            // Customer found
            res.status(200).json(result[0]);
        }
    );
});










 //order api
app.post('/saveOrder', (req, res) => {
    const { custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, phoneNumber } = req.body;

    // Save order details to the database
    db.query(
        'INSERT INTO tbl_orders (customerName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhonenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [custName, custPhoneNumber, JSON.stringify(cartItems), totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, phoneNumber],
        (err, result) => {
            if (err) {
                console.error('Error saving order:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Order saved successfully');
            res.status(200).json({ message: 'Order saved successfully' });
        }
    );
});


 
app.get('/orders/shops', (req, res) => {
    const { customerPhoneNumber } = req.query;

    db.query(
        'SELECT shopID, shopkeeperPhonenumber FROM tbl_orders WHERE custPhoneNumber = ? GROUP BY shopID, shopkeeperPhonenumber',
        [customerPhoneNumber],
        (err, results) => {
            if (err) {
                console.error('Error fetching shops:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json(results);
        }
    );
});

app.get('/orders/shop/:shopkeeperPhoneNumber', (req, res) => {
    const { shopkeeperPhoneNumber } = req.params;

    db.query(
        'SELECT id, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName, custPhoneNumber FROM tbl_orders WHERE shopkeeperPhonenumber = ?',
        [shopkeeperPhoneNumber],
        (err, results) => {
            if (err) {
                console.error('Error fetching orders:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json(results);
        }
    );
});

app.post('/preferredShops/add', (req, res) => {
    const { phoneNumber, shopID } = req.body;
  
    // Add the shopID to the preferred shops list for the given phoneNumber
    db.query(
      'INSERT INTO preferredShops (phoneNumber, shopID) VALUES (?, ?)',
      [phoneNumber, shopID],
      (err, result) => {
        if (err) {
          console.error('Error adding preferred shop:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        console.log('Preferred shop added successfully');
        res.status(200).json({ message: 'Preferred shop added successfully' });
      }
    );
  });
  
  
  
  app.get('/preferredShops/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Query the database to fetch preferred shops based on phoneNumber
    db.query(
        'SELECT * FROM preferredShops WHERE phoneNumber = ?',
        [phoneNumber],
        async (err, results) => {
            if (err) {
                console.error('Error fetching preferred shops:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Fetch shop details for each preferred shop
            try {
                const shopsWithDetails = await Promise.all(results.map(async (shop) => {
                    const shopDetails = await fetchShopDetails(shop.shopID);
                    return {
                        ...shop,
                        shopDetails
                    };
                }));

                res.status(200).json(shopsWithDetails);
            } catch (error) {
                console.error('Error fetching shop details for preferred shops:', error);
                res.status(500).json({ message: 'Error fetching shop details for preferred shops' });
            }
        }
    );
});

 


app.post('/shopkeeper/selectedSubServices', (req, res) => {
    console.log('Received request to save selected sub-services:', req.body);
    const { phoneNumber, mainServiceName, subServiceIds } = req.body;

    // Ensure all required fields are present
    if (!phoneNumber || !mainServiceName || !subServiceIds) {
        return res.status(400).json({ message: 'Please provide phoneNumber, mainServiceName, and subServiceIds' });
    }

    // Save selected sub-services to the database
    db.query(
        'INSERT INTO tbl_selected_services (phoneNumber, mainServiceName, subServiceIds) VALUES (?, ?, ?)',
        [phoneNumber, mainServiceName, JSON.stringify(subServiceIds)],
        (err, result) => {
            if (err) {
                console.error('Error saving selected services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Selected sub-services saved successfully:', result);
            res.status(200).json({ message: 'Selected sub-services saved successfully' });
        }
    );
});

app.get('/mainService/:subServiceId', (req, res) => {
    const subServiceId = req.params.subServiceId;

    db.query(
        'SELECT m.name FROM nkd.tbl_salon_main_services m JOIN nkd.tbl_salon_sub_sub_services s ON m.id = s.main_service_id WHERE s.id = ?',
        [subServiceId],
        (err, results) => {
            if (err) {
                console.error('Error fetching main service name:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Main service not found for the given sub-service ID' });
            }
            res.status(200).json(results[0]);
        }
    );
});

 
app.post('/saveSelectedServices', async (req, res) => {
    try {
        const { phoneNumber, selectedServices } = req.body;

        for (const service of selectedServices) {
            await db.query(
                'INSERT INTO tbl_selected_services (phoneNumber, mainServiceId, subServiceId, price) VALUES (?, ?, ?, ?)',
                [phoneNumber, service.mainServiceId, service.subServiceId, service.price]
            );
        }

        res.status(200).json({ message: 'Selected services saved successfully.' });
    } catch (error) {
        console.error('Error saving selected services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





app.get('/myServices/:phoneNumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;

        const queryResult = await db.query(
            'SELECT m.id AS mainServiceId, m.name AS mainServiceName, null AS subServiceId, null AS subServiceName, null AS subServicePrice ' +
            'FROM tbl_selected_services s ' +
            'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
            'WHERE s.phoneNumber = ? ' +
            'UNION ' +
            'SELECT s.mainServiceId, m.name AS mainServiceName, s.subServiceId, sub.name AS subServiceName, sub.price AS subServicePrice ' +
            'FROM tbl_selected_services s ' +
            'JOIN tbl_salon_sub_sub_services sub ON s.subServiceId = sub.id ' +
            'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
            'WHERE s.phoneNumber = ?',
            [phoneNumber, phoneNumber]
        );

        if (!queryResult || !queryResult.length) {
            console.error('No selected services found for this phone number:', phoneNumber);
            return res.status(404).json({ error: 'No selected services found for this phone number.' });
        }

        res.status(200).json(queryResult);
    } catch (error) {
        console.error('Error fetching selected services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Backend code to fetch selected services
 
app.get('/shopkeeper/selectedSubServices/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    db.query(
        'SELECT s.*, m.name AS mainServiceName, sub.name AS subServiceName, sub.price AS subServicePrice ' +
        'FROM tbl_selected_services s ' +
        'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
        'JOIN tbl_salon_sub_sub_services sub ON s.subServiceId = sub.id ' +
        'WHERE s.phoneNumber = ?',
        [phoneNumber],
        async (err, results) => {
            if (err) {
                console.error('Error fetching selected services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                console.error('No selected services found for this phone number:', phoneNumber);
                return res.status(404).json({ message: 'No selected services found for this phone number.' });
            }

            res.status(200).json(results);
        }
    );
});

app.get('/shopkeeper/selectedMainServices/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    db.query(
        'SELECT DISTINCT m.id AS mainServiceId, m.name AS mainServiceName ' +
        'FROM tbl_selected_services s ' +
        'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
        'WHERE s.phoneNumber = ?',
        [phoneNumber],
        async (err, results) => {
            if (err) {
                console.error('Error fetching selected main services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json(results);
        }
    );
});

app.get('/shopkeeper/selectedSubServices/:phoneNumber/:mainServiceId', (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const mainServiceId = req.params.mainServiceId;

    db.query(
        'SELECT s.*, sub.name AS subServiceName, sub.price AS subServicePrice ' +
        'FROM tbl_selected_services s ' +
        'JOIN tbl_salon_sub_sub_services sub ON s.subServiceId = sub.id ' +
        'WHERE s.phoneNumber = ? AND s.mainServiceId = ?',
        [phoneNumber, mainServiceId],
        async (err, results) => {
            if (err) {
                console.error('Error fetching selected sub services:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json(results);
        }
    );
});

app.get('/shopkeeperDetails/:shopID', (req, res) => {
    const shopID = req.params.shopID;

    // Check if shopID is a number
    if (isNaN(shopID)) {
        return res.status(400).json({ message: 'Invalid shop ID' });
    }

    // Query the database to fetch shopkeeper details based on shop ID
    db.query(
        'SELECT * FROM shopkeepers WHERE phoneNumber = ? OR shop_id = ? OR id = ?',
        [shopID, shopID, shopID],
        (err, result) => {
            if (err) {
                console.error('Error fetching shopkeeper details:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No shopkeeper found for this shop ID' });
            }

            // Shopkeeper found
            res.status(200).json(result[0]);
        }
    );
});




  
  // Backend code to fetch all types of shops
  app.get('/shops', (req, res) => {
    const { pincode } = req.query;

    // Query the database to fetch shops based on the provided pincode
    db.query(
        'SELECT * FROM shopkeepers WHERE pincode = ?',
        [pincode],
        (err, result) => {
            if (err) {
                console.error('Error fetching shops:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No shops found for this pincode' });
            }

            // Shop(s) found
            res.status(200).json(result);
        }
    );
});


app.get('/customerPincode/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    // Query the database to fetch customer's pincode based on phone number
    db.query(
        'SELECT pincode FROM newcustomers WHERE phoneNumber = ?',
        [phoneNumber],
        (err, result) => {
            if (err) {
                console.error('Error fetching customer pincode:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'No customer found for this phone number' });
            }

            // Customer pincode found
            const pincode = result[0].pincode;
            res.status(200).json({ pincode });
        }
    );
});

 
app.get('/shopDetails/:shopID', (req, res) => {
    const { shopID } = req.params;

    // Query the database to fetch shop details based on the phone number (shop ID)
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

            // Shop details found
            const shopDetails = result[0];
            res.status(200).json(shopDetails);
        }
    );
});

app.get('/shopkeepers/:shopID', (req, res) => {
    const { shopID } = req.params;

    db.query('SELECT * FROM shopkeepers WHERE phoneNumber = ?', [shopID], (err, results) => {
        if (err) {
            console.error('Error checking shopkeeper existence:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(404).json({ exists: false });
        }
    });
});


 

// Get shops in the area based on pincode
app.get('/shopsInArea/:pincode', async (req, res) => {
    const { pincode } = req.params;

    try {
        // Query the database to fetch shops based on the provided pincode
        const result = await new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM shopkeepers WHERE pincode = ?',
                [pincode],
                (err, result) => {
                    if (err) {
                        console.error('Error fetching shops in area:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        if (result.length === 0) {
            return res.status(404).json({ message: 'No shops found for this pincode' });
        }

        // Check if the shopID provided by the customer exists
        const { shopID } = req.query;
        if (shopID) {
            const shopIndex = result.findIndex(shop => shop.shopID === shopID);
            if (shopIndex !== -1) {
                const shop = result.splice(shopIndex, 1)[0]; // Remove the shop from the array
                result.unshift(shop); // Add the shop at the beginning of the array
            }
        }

        // Format the data to match the frontend expectation
        const formattedShops = await Promise.all(result.map(async shop => {
            const { id, shopkeeperName, phoneNumber, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory, registrationDate, shopID } = shop;
            return {
                id,
                shopkeeperName,
                pincode,
                shopState,
                city,
                address,
                salesAssociateNumber,
                selectedCategory,
                selectedSubCategory,
                registrationDate,
                shopID,
                phoneNumber // Include shopkeeper's phone number
            };
        }));

        // Shops found
        res.status(200).json(formattedShops);
    } catch (error) {
        console.error('Error fetching shops in area:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/orders/shopkeeper/:shopkeeperPhoneNumber', (req, res) => {
    const { shopkeeperPhoneNumber } = req.params;

    db.query(
        'SELECT * FROM tbl_orders WHERE shopkeeperPhonenumber = ?',
        [shopkeeperPhoneNumber],
        (err, results) => {
            if (err) {
                console.error('Error fetching orders:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json(results);
        }
    );
});


 



const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
}); 