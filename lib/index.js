"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const request = require("request");
const HOST_URL = 'https://api.randomuser.me/';
async function getUsers() {
    request.get(HOST_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return JSON.parse(body).results;
        }
    });
    return this;
}
exports.getUsers = getUsers;
//# sourceMappingURL=index.js.map