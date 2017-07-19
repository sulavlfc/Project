const chai = require('chai');
const chaiHttp = require('chai-http');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
var app = require('../app');
var Order = require('../models/order');
var Token = require("../models/rainer_token");
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

// before(function(done) {
// 	mockgoose.prepareStorage().then(function() {
// 		mongoose.connect('mongodb://sulav:sulav12345@ds135519.mlab.com:35519/centralcascade',{ useMongoClient: true }, function(err) {
// 			done(err);
// 		});
//         mongoose.connection.on('connected', function() {  
//             console.log('db connection is now open');
// 	    }); 
// 	});
// });

describe('CentralCascade-APP', function() {

	describe('/POST Order with validations', function() {
	
		it('it should not POST without customer_id, incomplete fields', (done) => {
			let order = {
				make: "string"
			};
			chai.request(app).post('/order').send(order).end(function(err, res) {
				res.should.have.status(400);
				done();
			});
		});
		it('it should not POST if model value is wrong', function(done) {
			let order = {
				make: "string",
				model: "GMC",
				customer_id: 2
			};
			chai.request(app).post('/order').send(order).end(function(err, res) {
				res.should.have.status(400);
				done();
			});
		});
	});

	describe('Order Post Acme and Rainer Test', function() {
		beforeEach((done) => {
			Order.remove({}, (err) => {
				done();
			});
		});

		it('it should POST to Rainer', function(done) {
			let order = {
				make: "string",
				model: "Ford",
				package: "string",
				customer_id: 100000
			};
			chai.request(app).post('/order').send(order).end(function(err, res) {
				res.should.have.status(200);
				done();
			});
		});

		it('it should POST to Acme', function(done) {
			let order = {
				make: "string",
				model: "Honda",
				package: "string",
				customer_id: 100000
			};
			chai.request(app).post('/order').send(order).end(function(err, res) {
				res.should.have.status(200);
				done();
			});
		});
	});

	describe('Get /Orders Test', function() {

		it('it should not GET with InCorrect Query String in the URL', function(done) {
			chai.request(app).get('/orders?keys=G856W6BaOh').end(function(err, res) {
				res.should.have.status(400);
				done();
			});
		});

		it('it should not GET with InCorrect Key Value', function(done) {
			chai.request(app).get('/orders?key=hellosulav').end(function(err, res) {
				res.should.have.status(403);
				done();
			});
		});
        
		it('it should GET only with Correct Key Value', function(done) {
			chai.request(app).get('/orders?key=G856W6BaOh').end(function(err, res) {
				res.should.have.status(200);
				done();
			});
		});
     
	});
});