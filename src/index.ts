
import * as request from 'request';

const HOST_URL: string = 'https://api.randomuser.me/';

export async function getUsers(): Promise<unknown> {
    request.get(HOST_URL, function (error, response, body) {
        if(!error && response.statusCode == 200) {
        	return JSON.parse(body).results;
        }
    });

    return this;
}