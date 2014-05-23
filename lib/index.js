"use strict";

/*!
 *  RandomUser API Node.js Library
 *  Author: Kevin Coughlin @kevintcoughlin
 *  MIT Licensed
 */
var request = require('request')
  , qs = require('qs');

/**
 * Class for handling communications with RandomUser's API.
 */
function RandomUser(opts) {
    if (!(this instanceof RandomUser)) {
        return new RandomUser(opts);
    }
    opts = opts || {};

    this.options = {
        baseURL: opts.baseUrl || 'http://api.randomuser.me/'
      , local: opts.local
    };
}
RandomUser.create = RandomUser;

/**
 * Retrieves randomly generated users from API with optional parameters.
 *
 * @param {Object}    params    Optional parameters for user generation API request
 * @param {Function}    callback    Callback function that will be called when the processing is done.
 */
RandomUser.prototype.getUsers = function (params, callback) {
    var me = this
      , url = me.options.baseURL + "?";

    if (typeof params === 'function') {
        callback = params;
        params = null;
    } 

    if (typeof callback !== 'function') {
        throw new Error('ERROR: Invalid callback function.');
    }
    else if (typeof params === 'object') {
        url += qs.stringify(params);
    }

    if (me.options.local) {
        process.nextTick(function () {
            callback(require('./api').getUsers(params).results);
        }, 0);
        return;
    }

    request.get(url, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            callback(JSON.parse(body).results);
        }
        if (error) {
            throw new Error(error);
        }
    });

    return this;
};

module.exports = RandomUser;
