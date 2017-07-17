/**
 * Created by Sulav on 7/14/2017.
 */
var express = require('express');
var router = express.Router();

// About route
var orderController = require('../controllers/orderController');

// Get apply page
router.post('/', orderController.post_order);
module.exports = router;