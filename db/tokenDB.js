'use strict';

const { AccessTokens } = require('./db');
const { RefreshTokens } = require('./db');
const uuid = require('uuid-random');

module.exports = {
    saveAccessToken: saveAccessToken,
    getAccessToken: getAccessToken,
    saveRefreshToken: saveRefreshToken,
    getRefreshToken: getRefreshToken,
    revokeRefreshToken: revokeRefreshToken
};

function saveAccessToken(accessToken, clientId, expires, userId, callback) {
    console.log('[ tokenDB ] saveAccessToken', accessToken, userId, expires instanceof Date);

    AccessTokens.create({
        accessToken: accessToken,
        userId: userId,
        expires: expires instanceof Date ? expires.getTime() : expires,
        clientId: clientId
    })

    callback();
}

function getAccessToken(bearerToken, callback) {
    console.log('[ tokenDB ] getAccessToken', bearerToken);

    let response = undefined;

    const token = AccessTokens.get(t => t.accessToken === bearerToken);
    if (token) {
        response = Object.assign({}, token, { expires: new Date(token.expires)});
    }

    callback(response);
}

function saveRefreshToken(token, clientId, expires, userId, callback) {
    console.log('[ tokenDB ] saveRefreshToken', token, userId, expires instanceof Date);

    RefreshTokens.create({
        refreshToken: token,
        userId: userId,
        expires: expires instanceof Date ? expires.getTime() : expires,
        clientId: clientId
    })

    callback();
}

function getRefreshToken(refreshToken, callback) {
    console.log('[ tokenDB ] getRefreshToken', refreshToken);

    let response = undefined;

    const token = RefreshTokens.get(t => t.refreshToken === refreshToken);
    if (token) {
        response = Object.assign({}, token, { expires: new Date(token.expires)});
    }

    callback(response);
}

function revokeRefreshToken(token, callback) {
    console.log('[ tokenDB ] revokeRefreshToken', token);

    RefreshTokens.remove(t => t.refreshToken === token);
    callback();
}