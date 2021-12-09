'use strict';
const crypto = require('crypto');
const uuid = require('uuid-random');
const { Users } = require('./db');

module.exports = {
    register: register,
    getUser: getUser,
    isValidUser: isValidUser
};


function register(username, password, callback) {
    let response = { error: undefined, results: null };
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    console.log('[ userDB ] register', username, password);

    if (Users.fetch(u => u.username === username)) {
        response.error = `Failed to register user: User already exists`;
    } else {
        Users.create({ id: uuid(), username: username, user_password: shaPass });
    }

    callback(response);
}

function getUser(username, password, callback) {
    let response = { error: undefined, results: null };
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    let user = Users.fetch(u => u.username === username && u.user_password === shaPass);
    console.log('[ userDB ] getUser', user);
    if (user) {
        response.results = user;
    }

    callback(response.error, response.results);
}

function isValidUser(username, callback) {
    let response = { error: undefined, results: true };
    let user = Users.fetch(u => u.username === username);
    console.log('[ userDB ] isValidUser', user);

    if (user) {
        response.results = false;
    }

    callback(response.error, response.results);
}
