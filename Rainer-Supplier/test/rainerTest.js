const chai = require('chai');
const chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('Rainer-APP', function() {
    
describe('/POST request_customized_model', () => {
      it('it should not POST without a token', (done) => {
       
        chai.request(app)
            .post('/r/request_customized_model')
            .end((err, res) => {
                expect(res).to.have.status(400);                
                done();
            });
      });

      it('it should  POST only with a token and response json', (done) => {
        
        chai.request(app)
            .post('/r/request_customized_model/?token=hello')
            .end((err, res) => {
                expect(res).to.have.status(200);   
                expect(res).to.be.json;
                done();
            });
      });

     

  });

  describe('/GET nonce Token', () => {
      it('it should not GET without a store front', (done) => {
        
        chai.request(app)
            .get('/r/nonce_token')
            .end((err, res) => {
                expect(res).to.have.status(400);                
                done();
            });
      });

       it('it should not GET with invalid store front', (done) => {
        
        chai.request(app)
            .get('/r/nonce_token?store_front=hello')
            .end((err, res) => {
                expect(res).to.have.status(400);                
                done();
            });
      });


       it('it should  GET with a valid store front', (done) => {
        
        chai.request(app)
            .get('/r/nonce_token?store_front=ccas-bb9630c04f')
            .end((err, res) => {
                expect(res).to.have.status(200);   
                 expect(res).to.be.json;             
                done();
            });
     });
  });

})