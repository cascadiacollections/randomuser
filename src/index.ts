import * as fetch from 'node-fetch';

const HOST_URL: string = 'https://api.randomuser.me/';

export async function getUsers(): Promise<unknown> {
    return fetch(HOST_URL).then(res => res.json());
}