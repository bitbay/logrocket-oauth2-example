# Implementing OAuth 2.0 in Node.js

This is the source code for my article on [Implementing OAuth 2.0 in Node.js](https://blog.logrocket.com/implementing-oauth-2-0-in-node-js/).

This fork uses `simple.db` node module and doesn´t have any other database dependencies.

To start the app, run the command to install the npm dependencies:

```
npm install
```

And finally:

```
node index.js
```

The app will start at http://localhost:3000.

### From the command-line
To register a user:
```
$ curl -d "username=user&password=secret" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/auth/register
{"message":"Success!!"}
```
To login the registered user:
```
$ curl -d "grant_type=password&username=user&password=secret&client_id=null&client_secret=null" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/auth/login
{"token_type":"bearer","access_token":"a77637af70c4ffa57d33f5711101b8538f6da08d","expires_in":3600}
```
To access a restricted resource with a valid access token:
```
$ curl -H "Authorization: Bearer a77637af70c4ffa57d33f5711101b8538f6da08d" -X GET http://localhost:3000/test/hello
Hello World OAuth2!
```
Accessing a restricted resource with no access token:
```
$ curl http://localhost:3000/test/hello
OAuth2Error: The access token was not found
```