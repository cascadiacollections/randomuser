import * as fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import type { IRandomUserResponse, Result } from './types';

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

    /**
     * Constructor.
     *
     * @returns RandomUser
     */
    constructor() {
        if (!(this instanceof RandomUser)) {
            return new RandomUser();
        }
    }

    /**
     * @param params the optional parameters for user generation API request
     * @param callback the callback function that will be called when the processing is done
     * @returns RandomUser
     */
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
            .then((res: fetch.Response) => res.json())
            .then((json: IRandomUserResponse) => callback?.(json.results));

        return this;
    }
}

export = RandomUser;
