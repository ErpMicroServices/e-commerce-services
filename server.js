import restify from 'restify';
import config from "./config";
import db from "./database";
import {user_login} from './schema';
import jwt from "jsonwebtoken";
import {register_user, authenticate_user} from "./handlers";

var server = restify.createServer();

server.name = config.server.name;
server.version = config.server.version;

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/register', register_user);
server.post('/authenticate', authenticate_user);

server.listen(config.server.port, function() {
    console.log('%s listening at %s', config.server.name, config.server.url);
});
