import * as request from 'request';
import * as qs from 'qs';

class RandomUser {
    private options: { baseURL: string };

    constructor() {
        if (!(this instanceof RandomUser)) {
            return new RandomUser();
        }

        this.options = {
            baseURL: 'https://randomuser.me/api/'
        };
    }

    /**
     * Retrieves randomly generated users from API with optional parameters.
     *
     * @param {Object}    params    Optional parameters for user generation API request
     * @param {Function}    callback    Callback function that will be called when the processing is done.
     */
    public getUsers(params?: any, callback?: (body: any) => void): RandomUser { // tslint:disable-line:no-any
        let url: string = this.options.baseURL + '?';

        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        if (typeof callback !== 'function') {
            throw new Error('ERROR: Invalid callback function.');
        } else if (typeof params === 'object') {
            url += qs.stringify(params);
        }

        request.get(url, (error: any, response: any, body: any): void => { // tslint:disable-line:no-any
            if (!error && response.statusCode === 200) {
                callback!(JSON.parse(body).results);
            }
            if (error) {
                throw new Error(error);
            }
        });

        return this;
    }
}

// tslint:disable-next-line:export-name
export = RandomUser;
