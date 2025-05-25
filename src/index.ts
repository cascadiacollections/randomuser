import * as fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import type { IRandomUserResponse, Result, RandomUserParams, RandomUserError } from './types';

const BASE_URL: string = 'https://randomuser.me/api/';

/**
 * Options for asynchronous API requests
 */
export interface AsyncRequestOptions {
    /**
     * AbortSignal to cancel the request
     */
    signal?: AbortSignal;
    /**
     * Timeout in milliseconds
     */
    timeout?: number;
}

interface _IRandomUser {
    /**
     * Retrieves randomly generated users from API with optional parameters.
     *
     * @param {RandomUserParams}    params    Optional parameters for user generation API request
     * @param {Function}  callback    Callback function that will be called when the processing is done.
     * @deprecated Use getUsersAsync instead. This method will be removed in the next major version.
     */
    getUsers(params?: RandomUserParams, callback?: (body: Result[]) => void): RandomUser;

    /**
     * Retrieves randomly generated users from API with optional parameters asynchronously.
     *
     * @param {RandomUserParams}    params    Optional parameters for user generation API request
     * @param {AsyncRequestOptions}    options    Optional request configuration options
     * @returns {Promise<Result[]>} Promise that resolves with the generated user data
     */
    getUsersAsync(params?: RandomUserParams, options?: AsyncRequestOptions): Promise<Result[]>;
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
    public getUsers(params?: RandomUserParams, callback?: (body: Result[]) => void): RandomUser {
        let url: string = BASE_URL + '?';

        if (typeof params === 'function') {
            callback = params;
            params = undefined;
        }

        if (typeof callback !== 'function') {
            throw new Error('ERROR: Invalid callback function.');
        } else if (typeof params === 'object') {
            const queryParams = new URLSearchParams(params as Record<string, string | readonly string[]>);
            url += queryParams.toString();
        }

        fetch(url)
            .then((res: fetch.Response) => res.json())
            .then((json: IRandomUserResponse) => {
                if (json.error) {
                    const error: RandomUserError = new Error(json.error);
                    throw error;
                }
                callback?.(json.results);
            })
            .catch((error: Error) => {
                console.error('Error fetching random users:', error);
                throw error;
            });

        return this;
    }

    /**
     * Retrieves randomly generated users from API with optional parameters asynchronously.
     *
     * @param params the optional parameters for user generation API request
     * @param options optional request configuration
     * @returns Promise that resolves with the generated user data
     * @throws {RandomUserError} If the API returns an error or the request fails
     * 
     * @example
     * // Get 5 male users with a specific seed
     * const users = await client.getUsersAsync({ 
     *   seed: "foxie", 
     *   results: 5, 
     *   gender: "male" 
     * });
     *
     * @example
     * // With request cancellation
     * const controller = new AbortController();
     * const timeoutId = setTimeout(() => controller.abort(), 5000);
     * try {
     *   const users = await client.getUsersAsync({}, { signal: controller.signal });
     *   clearTimeout(timeoutId);
     *   return users;
     * } catch (error) {
     *   if (error.name === 'AbortError') {
     *     console.log('Request was cancelled');
     *   }
     *   throw error;
     * }
     */
    public async getUsersAsync(
        params?: RandomUserParams,
        options?: AsyncRequestOptions
    ): Promise<Result[]> {
        let url: string = BASE_URL + '?';

        if (typeof params === 'object') {
            const queryParams = new URLSearchParams(params as Record<string, string | readonly string[]>);
            url += queryParams.toString();
        }

        try {
            const fetchOptions: fetch.RequestInit = {};
            
            if (options?.signal) {
                fetchOptions.signal = options.signal;
            }
            
            if (options?.timeout) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), options.timeout);
                
                if (!fetchOptions.signal) {
                    fetchOptions.signal = controller.signal;
                }
                
                const res = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);
                const json: IRandomUserResponse = await res.json();
                
                if (json.error) {
                    const error: RandomUserError = new Error(json.error);
                    error.code = 'API_ERROR';
                    throw error;
                }
                
                return json.results;
            }
            
            const res = await fetch(url, fetchOptions);
            const json: IRandomUserResponse = await res.json();
            
            if (json.error) {
                const error: RandomUserError = new Error(json.error);
                error.code = 'API_ERROR';
                throw error;
            }
            
            return json.results;
        } catch (error) {
            const randomUserError: RandomUserError = error as RandomUserError;
            
            if (error.name === 'AbortError') {
                randomUserError.code = 'ABORT_ERROR';
            } else if (!randomUserError.code) {
                randomUserError.code = 'NETWORK_ERROR';
            }
            
            throw randomUserError;
        }
    }
}

// Export the RandomUser class - this replaces the previous "export = RandomUser" syntax
export default RandomUser;
