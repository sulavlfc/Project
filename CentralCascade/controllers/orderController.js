var bodyParser = require('body-parser');
var request = require('superagent');
var Order = require("../models/order");
var CustomerOrder = require("../models/customer_order");
var Token = require("../models/rainer_token");
var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;


exports.post_order = function(req, res) {
	
	var order = new Order({
		make: req.body.make,
		model: req.body.model,
		package: req.body.package,
		customer_id: req.body.customer_id
    });
	    
	order.save().then(function(data) {
        request
        .post('https://hbwut3q1ld.execute-api.us-east-2.amazonaws.com/test/orderFunction')
        .send(data)
        .end(function(err, response) {
			if (err) {
				console.log(err)
				res.sendStatus(400)
			} else {
				//supplier(acme_call(data),res,response,data);
				var rainer_promise = Token.count({}).exec();
				rainer_promise.then(function(count) {
					console.log(count)
					if (count == 0) {
                        request
                        .get('http://localhost:3051/r/nonce_token?store_front=ccas-bb9630c04f')
                        .end(function(err, resp) {
							console.log(resp.body)
							var token = new Token({
								token: resp.body.nonce_token
							});
							console.log("before : " + token)
							token.save();
							supplier(rainer_call(data, resp.body.nonce_token), res, response);
						});
					} else {
						Token.find({}, function(err, token) {
							console.log("after : " + token[0].token)
							supplier(rainer_call(data, token[0].token), res, response,data);
						});
					}
				});
			}
		});
	}).catch(function(err) {
		console.log('error :', err);
		res.send(400);
	});

};

function acme_call(data) {
	console.log("here")
	return q.Promise(function(resolve, reject) {
        request
        .post('http://localhost:3050/acme/api/v45.1/order?api_key=cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
        .send(data)
        .end(function(err, resp) {
			console.log('getting to end cb');
			if (err) {
				reject(err);
			} else resolve(resp.body);
		})
	});
};

function rainer_call(data, token) {
	var json_data = {};
	json_data.model = data.model;
	json_data.custom = data.package;
	return q.Promise(function(resolve, reject) {
        request
        .post('http://localhost:3051/r/request_customized_model?token=' + token)
        .send(json_data)
        .end(function(err, resp) {
			if (err) {
				reject(err);
			} else resolve(resp.body);
		});
	})
}

function supplier(promise, res, response,data) {

	promise.then(function(supp_response) {
		console.log("henrenow")
        console.log(supp_response)
        

        var customerOrder = new CustomerOrder({
            customer_id : data.customer_id,
			supplier : supp_response.order.supplier,
			order_id : supp_response.order.order_id
	    });
		customerOrder.save().catch(function(err) {
		console.log('error :', err);
		res.send(400);
	});
		res.json({
			message: "success",
			url: response.body.Location,
			order: supp_response.order
		});
	});
}