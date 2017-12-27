var assert = require('assert');
var calc = require('../backend/controller.js')

describe('calculation3', ()=> {

     it('returns 1 + 4 = 5', (done) => {
      // calculating using the api function
         assert.equal(calc.add(1,4), 5);
        done();
  });
  it('returns 1 + -10 = -9', function(done) {
    // another test casess
			assert.equal(calc.add(1, -10), -9);
			done();
		});
});
