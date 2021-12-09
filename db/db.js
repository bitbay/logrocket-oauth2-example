'use strict';
const { Database } = require('simpl.db');

const db = new Database({
    collectionsFolder: `.simpledb/collections`,
    dataFile: `.simpledb/database.json`
});

const Users = db.createCollection('users', {
    id: null,
    username: null,
    user_password: null
});

const AccessTokens = db.createCollection('access_tokens', {
    accessToken: null,
    userId: null,
    expires: null,
    clientId: null
});

const RefreshTokens = db.createCollection('refresh_tokens', {
    refreshToken: null,
    userId: null,
    expires: null,
    clientId: null
});

module.exports =  {
    Users: Users,
    AccessTokens: AccessTokens,
    RefreshTokens: RefreshTokens
}