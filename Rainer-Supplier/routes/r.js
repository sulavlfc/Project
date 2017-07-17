var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/nonce_token', function(req, res, next) {
  if (req.query.store_front="ccas-bb9630c04f"){
  		crypto.randomBytes(48, function(err, buffer) {
  			var token = buffer.toString('hex');
		});
  		res.json({nonce_token: token});
  }
  else
  	res.sendStatus(400);

});


router.post('/request_customized_model', function(req, res, next) {
  if (req.query.store_front="ccas-bb9630c04f"){
  		res.json({nonce_token: "ff6bfd673ab6ae03d8911"});
  }
  else
  	res.sendStatus(400);

});



module.exports = router;
