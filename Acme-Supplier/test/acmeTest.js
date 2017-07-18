const chai = require('chai');
const chaiHttp = require('chai-http');
var app = require('../app');

process.env.NODE_ENV = 'test';

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Acme-APP', () => {
    
    describe('/POST Acme version 45.1 ', () => {
        it('it should NOT POST WITHOUT an api_key', (done) => {
        
            chai.request(app)
                .post('/acme/api/v45.1/order')
                .end((err, res) => {
                    expect(res).to.have.status(400);                
                    done();
                });
        });

        it('it should NOT POST with a WRONG api_key', (done) => {
       
            chai.request(app)
                .post('/acme/api/v45.1/order?api_key=hello')
                .end((err, res) => {
                    expect(res).to.have.status(400);                
                    done();
                });
      });

         it('it should ONLY POST with a CORRECT api_key', (done) => {
       
            chai.request(app)
                .post('/acme/api/v45.1/order?api_key=cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;              
                    done();
                });
      });

    });


})