var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var random = require("random-js")(); // uses the nativeMath engine
/* GET home page. */
router.get('/nonce_token', function(req, res, next) {
	
  console.log("get token")
	
  if (req.query.store_front=='ccas-bb9630c04f'){
  		crypto.randomBytes(48, function(err, buffer) {
			  var token = buffer.toString('hex');
			  res.json({nonce_token: token});
		});
	
  }
  else{
  	res.sendStatus(400);
  }		
		


});


router.post('/request_customized_model', function(req, res, next) {
console.log("No token")
console.log(req.query)
if (req.query.token){
	res.json({ order : { supplier :"Rainer" , order_id : random.integer(1000, 9999)}});
}
else{
	res.sendStatus(400);
}



});



module.exports = router;
