/**
 * Created by Sulav on 7/19/2017.
 */
var express = require('express');
var router = express.Router();

// About route
var customerController = require('../controllers/customerController');

// Get apply page
router.post('/', customerController.post_customer);
router.get('/',customerController.get_customer);
router.get('/isvalid',customerController.isValidAddress);

module.exports = router;