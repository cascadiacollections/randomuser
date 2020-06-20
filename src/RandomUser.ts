import * as fetch from 'node-fetch';

const HOST_URL: string = 'https://api.randomuser.me/';

export async function getUsers(): Promise<unknown> {
    return fetch(HOST_URL).then((res: any) => res.json());
}

/**
 * @deprecated
 */
export class RandomUser {
    public getUsers(params: {}, callback: (body: any) => void) {
        fetch(HOST_URL).then((res: any) => callback(res.json()));

        return this;
    }
}