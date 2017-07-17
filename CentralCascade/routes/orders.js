/**
 * Created by Sulav on 7/15/2017.
 */

var express = require('express');
var router = express.Router();

// About route
var ordersController = require('../controllers/ordersController');

// Get apply page
router.get('/', ordersController.get_orders);
module.exports = router;