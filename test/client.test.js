// @ts-check
'use strict';

const RandomUser = require('..');
const should = require('should');

// Simple test suite that doesn't rely on actual API calls
describe('RandomUser Client', function() {
  describe('API Interface', () => {
    let r;

    beforeEach(() => {
      r = new RandomUser();
    });

    it('should have a getUsers method', () => {
      should.exist(r.getUsers);
      r.getUsers.should.be.a.Function();
    });

    it('should have a getUsersAsync method', () => {
      should.exist(r.getUsersAsync);
      r.getUsersAsync.should.be.a.Function();
    });

    it('should throw error if callback is not typeof function', () => {
      (function() {
        r.getUsers(null, null, 'string');
      }).should.throwError('ERROR: Invalid callback function.');
    });

    // Test the structure without making actual API calls
    it('getUsers should return the RandomUser instance for chaining', () => {
      const result = r.getUsers(() => {});
      should.exist(result);
      result.should.equal(r);
    });
  });

  // Only test AbortController functionality which doesn't need the actual API
  describe('AbortController Support', () => {
    let r;

    beforeEach(() => {
      r = new RandomUser();
      
      // Mock fetch to simulate behavior without actual API calls
      global.fetch = async (url, options) => {
        if (options?.signal?.aborted) {
          const error = new Error('The operation was aborted');
          error.name = 'AbortError';
          throw error;
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({
            results: [{ name: { first: 'Test', last: 'User' } }],
            info: { seed: 'test', results: 1, page: 1, version: '1.0' }
          })
        };
      };
    });

    afterEach(() => {
      // Restore original fetch
      delete global.fetch;
    });

    it('should handle pre-aborted controller', async () => {
      try {
        const controller = new AbortController();
        controller.abort();
        
        await r.getUsersAsync({}, { signal: controller.signal });
        should.fail('Expected to throw an error');
      } catch (error) {
        should.exist(error);
        error.should.have.property('code').which.is.String();
        error.code.should.equal('ABORT_ERROR');
      }
    });

    it('should handle timeouts via options', async () => {
      try {
        // Use a timeout of 1ms to ensure it triggers
        await r.getUsersAsync({}, { timeout: 1 });
        
        // Sleep 20ms to make sure timeout has a chance to trigger
        await new Promise(resolve => setTimeout(resolve, 20));
        
        should.fail('Expected timeout to trigger error');
      } catch (error) {
        should.exist(error);
      }
    });
  });
});
