import * as fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { Result } from './types';

const BASE_URL: string = 'https://randomuser.me/api/';

interface _IRandomUser {
    /**
     * Retrieves randomly generated users from API with optional parameters.
     *
     * @param {Object}    params    Optional parameters for user generation API request
     * @param {Function}  callback    Callback function that will be called when the processing is done.
     */
    getUsers(params?: Record<string, string | readonly string[]>, callback?: (body: Result[]) => void): RandomUser;
}

class RandomUser implements _IRandomUser {

    constructor() {
        if (!(this instanceof RandomUser)) {
            return new RandomUser();
        }
    }

    public getUsers(params?: Record<string, string | readonly string[]>, callback?: (body: Result[]) => void): RandomUser {
        let url: string = BASE_URL + '?';

        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        if (typeof callback !== 'function') {
            throw new Error('ERROR: Invalid callback function.');
        } else if (typeof params === 'object') {
            const queryParams = new URLSearchParams(params);
            url += queryParams.toString();
        }

        fetch(url)
            .then(res => res.json())
            .then(json => callback!(json.results));

        return this;
    }
}

// tslint:disable-next-line:export-name
export = RandomUser;
