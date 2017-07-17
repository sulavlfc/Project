var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var random = require("random-js")(); // uses the nativeMath engine
/* GET home page. */
router.get('/nonce_token', function(req, res, next) {
	//console.log("hello" + req.query.store_front)
	
  if (req.query.store_front='ccas-bb9630c04f'){
  		crypto.randomBytes(48, function(err, buffer) {
			  var token = buffer.toString('hex');
				console.log(token)
			  res.json({nonce_token: token});
		});
		
  		//res.json({nonce_token: token});
  }
  else
  	res.sendStatus(400);
  		
		


});


router.post('/request_customized_model', function(req, res, next) {

res.json({ order : { supplier :"Rainer" , order_id : random.integer(1000, 9999)}});

});



module.exports = router;
