// Database imports
const tokenDB = require("./db/tokenDB");
const userDB = require("./db/userDB");

// OAuth imports
const oAuthService = require("./auth/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");

// Express
const express = require("express");
const app = express();
app.oauth = oAuth2Server({
	model: oAuthService,
	grants: ["password", "refresh_token"],
	accessTokenLifetime: 60,
	debug: true,
	passthroughErrors: false
});

const testAPIService = require("./test/testAPIService.js");
const testAPIRoutes = require("./test/testAPIRoutes.js")(
	express.Router(),
	app,
	testAPIService
);

// Auth and routes
const authenticator = require("./auth/authenticator")(userDB);
const routes = require("./auth/routes")(
	express.Router(),
	app,
	authenticator
);
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", routes);
app.use("/test", testAPIRoutes);
app.use(app.oauth.errorHandler());

const port = 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
