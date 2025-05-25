// @ts-check
'use strict';

const RandomUser = require('..')
  , should = require('should');

describe('r.getUsers()', () => {
  let r;

  beforeEach(() => {
    r = new RandomUser();
  });

  it('should throw error if callback is not typeof function', () => {
    (function() {
      r.getUsers(null, null, 'string');
    }).should.throwError('ERROR: Invalid callback function.');
  });

  it('should successfully complete a request without params', (done) => {
    r.getUsers(data => {
      should.exist(data);
      done();
    });
  });

  it('should successfully complete a request with params', (done) => {
    r.getUsers({ seed: "foxie", results: 5, gender: "male" }, data => {
      should.exist(data);
      done();
    });
  });
});

describe('r.getUsersAsync()', () => {
  let r;

  beforeEach(() => {
    r = new RandomUser();
  });

  it('should successfully complete a request without params', async () => {
    const data = await r.getUsersAsync();
    should.exist(data);
    data.should.be.an.Array();
  });

  it('should successfully complete a request with params', async () => {
    const data = await r.getUsersAsync({ seed: "foxie", results: 5, gender: "male" });
    should.exist(data);
    data.should.be.an.Array();
    data.length.should.equal(5);
  });
});
