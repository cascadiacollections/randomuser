"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const fetch = require("node-fetch");
const HOST_URL = 'https://api.randomuser.me/';
async function getUsers() {
    return fetch(HOST_URL).then(res => res.json());
}
getUsers().then(js => console.log(js));
exports.getUsers = getUsers;
//# sourceMappingURL=index.js.map