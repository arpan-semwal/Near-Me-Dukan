// routes/helloRoutes.js
const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloControllers');

router.get('/', helloController.sayHello);

module.exports = router;
