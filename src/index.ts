import * as request from 'request';
import * as qs from 'qs';

class RandomUser {
    private options: { baseURL: string };

    constructor() {
        if (!(this instanceof RandomUser)) {
            return new RandomUser();
        }

        this.options = {
            baseURL: 'https://api.randomuser.me/'
        };
    }
    /**
     * Retrieves randomly generated users from API with optional parameters.
     *
     * @param {Object}    params    Optional parameters for user generation API request
     * @param {Function}    callback    Callback function that will be called when the processing is done.
     */
    getUsers(params: any, callback: (body: any) => void) {
        var url = this.options.baseURL + "?";

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

        request.get(url, function (error: any, response: any, body: any) {
            if (!error && response.statusCode == 200) {
                callback(JSON.parse(body).results);
            }
            if (error) {
                throw new Error(error);
            }
        });

        return this;
    }
}

export { RandomUser }
