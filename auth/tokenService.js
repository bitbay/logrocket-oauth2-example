let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
	userDB = injectedUserDB;
	tokenDB = injectedTokenDB;

	return {
		getClient: getClient,
		getUser: getUser,
		grantTypeAllowed: grantTypeAllowed,
		getAccessToken: getAccessToken,
		saveAccessToken: saveAccessToken,
		getRefreshToken: getRefreshToken,
		saveRefreshToken: saveRefreshToken,
		revokeRefreshToken: revokeRefreshToken
	};
};

function getClient(clientID, clientSecret, callback) {
	console.log('[ tokenService ] getClient');
	const client = {
		clientID,
		clientSecret,
		grants: null,
		redirectUris: null,
	};

	callback(false, client);
}

function grantTypeAllowed(clientID, grantType, callback) {
	console.log('[ tokenService ] grantTypeAllowed');
	callback(false, true);
}

function getUser(username, password, callback) {
	console.log('[ tokenService ] getUser');
	userDB.getUser(username, password, callback);
}

function saveAccessToken(accessToken, clientID, expires, user, callback) {
	console.log('[ tokenService ] saveAccessToken');
	tokenDB.saveAccessToken(accessToken, clientID, expires, user.id, callback);
}

function getAccessToken(bearerToken, callback) {
	console.log('[ tokenService ] getAccessToken');
	tokenDB.getAccessToken(bearerToken, (token) => {
		callback(false, token ? token : false);
	});
}

function saveRefreshToken(refreshToken, clientId, expires, user, callback) {
	console.log('[ tokenService ] saveRefreshToken');
	
	let error = undefined;
	tokenDB.saveRefreshToken(refreshToken, clientId, expires, user.id, callback);

	callback(error);
}

function getRefreshToken(refreshToken, callback) {
	console.log('[ tokenService ] getRefreshToken');
	
	tokenDB.getRefreshToken(refreshToken, (token) => {
		callback(false, token ? token : false);
	});
}

function revokeRefreshToken(refreshToken, callback) {
	console.log('[ tokenService ] revokeRefreshToken');
	
	tokenDB.revokeRefreshToken(refreshToken, (error) => {
		callback(error);
	});
}