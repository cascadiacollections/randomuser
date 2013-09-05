/** 
 * Tests for RandomUser.me's REST API
 * Test Framework: Mocha (http://visionmedia.github.io/mocha/)
 * Assertions: Should (https://github.com/visionmedia/should.js/) 
 */

var RandomUser = require('..')
  , should = require('should')
  , request = require('supertest')
  , request = request('http://randomuser.me/g/')
  , r;

beforeEach(function(){
  r = new RandomUser();
});

describe('RandomUser API', function () {
  this.timeout(15000);
    it('responds with JSON', function (done) {
      request
        .get()
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.header['content-type'].should.eql('application/json');
          res.body.should.exit;
          done();
        });
    });
});