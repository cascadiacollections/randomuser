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
     * @deprecated Use getUsersAsync instead. This method will be removed in the next major version.
     */
    getUsers(params?: Record<string, string | readonly string[]>, callback?: (body: Result[]) => void): RandomUser;

    /**
     * Retrieves randomly generated users from API with optional parameters asynchronously.
     *
     * @param {Object}    params    Optional parameters for user generation API request
     * @returns {Promise<Result[]>} Promise that resolves with the generated user data
     */
    getUsersAsync(params?: Record<string, string | readonly string[]>): Promise<Result[]>;
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
     * @deprecated Use getUsersAsync instead. This method will be removed in the next major version.
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

    /**
     * Retrieves randomly generated users from API with optional parameters asynchronously.
     *
     * @param params the optional parameters for user generation API request
     * @returns Promise that resolves with the generated user data
     */
    public getUsersAsync(params?: Record<string, string | readonly string[]>): Promise<Result[]> {
        let url: string = BASE_URL + '?';

        if (typeof params === 'object') {
            const queryParams = new URLSearchParams(params);
            url += queryParams.toString();
        }

        return fetch(url)
            .then((res: fetch.Response) => res.json())
            .then((json: IRandomUserResponse) => json.results);
    }
}

export = RandomUser;
