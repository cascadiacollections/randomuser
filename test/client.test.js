/** 
 * Tests for RandomUser Node client
 * Test Framework: Mocha (http://visionmedia.github.io/mocha/)
 * Assertions: Should (https://github.com/visionmedia/should.js/) 
 */
var RandomUser = require('..')
  , should = require('should')
  , r;

beforeEach(function(){
  r = new RandomUser();
});

describe('r.getUsers()', function() {
  this.timeout(15000);
  
  it('should throw error if callback is not typeof function', function () {
    (function() {
      r.getUsers(null, null, 'string');
    }).should.throwError('ERROR: Invalid callback function.');
  });

  it('should successfully complete a request without params', function (done) {
    r.getUsers(function(data) {
      should.exist(data);
      done();
    });
  });

  it('should successfully complete a request with params', function (done) {
    r.getUsers({ seed: "foxie", results: 5, gender: "male" }, function(data) {
      should.exist(data);
      done();
    });
  });
});