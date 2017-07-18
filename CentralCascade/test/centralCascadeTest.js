const chai = require('chai');
const chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var app = require('../app');
var Order = require('../models/order');
var Token = require("../models/rainer_token");
// const contactController = require('../controllers/contactController');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Order Post Data validation Test', () => {
    
    // beforeEach((done) => {
        
    //    // Order.remove({});
    //     done();         
        
    // });
    describe('/POST Order', () => {
        it('it should not POST without customer_id, incomplete fields', (done) => {
           
            let order = {
                make : "string"
            };
            chai.request(app)
                .post('/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(400);
                    
                done();
                });
        });

        it('it should not POST if customer_id is not unique', (done) => {
           
            //please comment the Order.remove({}) section before running this section of code
            //please pass some the value of customer_id already from database
            //Or run this code twice , first time it will fail as it is unique but will fail from next time

            var order = new Order({
                make : "string",
                model :"Ford",
                customer_id : 1
            });

            chai.request(app)
                .post('/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(400);
                   
                done();
                });
        });  

        it('it should not POST if model value is wrong', (done) => {
           
            //please make sure to change the value of customer_id

            let order = {
                make : "string",
                model :"GMC",
                customer_id : 2
            };

            chai.request(app)
                .post('/order')
                .send(order)
                .end((err, res) => {

                    res.should.have.status(400);
                   
                done();
                });
        }); 
    });

});


describe('Order Post Rainer Test', () => {
    
    beforeEach((done) => {
        Order.remove({});    
        Token.remove({}); 
               
        done();
    });
    describe('/POST Order', () => {
        it('it should POST to Rainer', (done) => {
           
            let order = {
                make : "string",
                model : "Ford",
                package : "string",
                customer_id : 1001
            };
            chai.request(app)
                .post('/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    
                done();
                });
        });

        // it('it should not POST if customer_id is not unique', (done) => {
           
        //     //please comment the Order.remove({}, (err) section before running this section of code
        //     //please pass some the value of customer_id already from database
        //     //Or run this code twice , first time it will fail as it is unique but will fail from next time

        //     let order = {
        //         make : "string",
        //         customer_id : 2
        //     };

        //     chai.request(app)
        //         .post('/order')
        //         .send(order)
        //         .end((err, res) => {
        //             res.should.have.status(400);
                   
        //         done();
        //         });
        // });        
    });

});