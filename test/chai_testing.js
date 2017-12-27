// var log = console.log;

// log('testing starts here');
// const chai = require('chai');
// const chaihttp = require('chai-http');

// var server = require('../server.js');
// var should = chai.should()

// // log(server);

// chai.use(chaihttp);

// describe('Blobs', ()=> {
//       it('should list All');
// })


// it('should list All',function(done) {
//     log(chai.request)
//   chai.request(server)
//     .get('/hel')
//        .end((er, res) => {
//            res.should.have.status(200)
//            done()
//       })
// })
//
// var expect  = require('chai').expect;
// var request = require('request');
//
// it('Main page content', function(done) {
//     request('http://localhost:3000/hel' , function(error, response, body) {
//         expect(body).to.equal("Hello World");
//         done();
//     });
// });
var assert = require('assert');
var calc = require('../backend/controller.js')

describe('calculation test', ()=> {

     it('returns 1 + 1 = 2', (done) => {
      // calculating using the api function
         assert.equal(calc.add(1,1), 2);
        done();
  });
  it('returns 1 + -1 = 0', function(done) {
    // another test casess
			assert.equal(calc.add(1, -1), 0);
			done();
		});
});
