import restify from 'restify';
import config from "./config";

import
user_login from './schema/user';

import jwt from "jsonwebtoken";

var server = restify.createServer();

server.name = config.server.name;
server.version = config.server.version;

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/register', function(req, res) {
    let registration_info = {
        user_id: req.body.user_id,
        password: req.body.password
    };
    let errors = user_login.validate(registration_info) || [];
    if (errors && (errors.length > 0)) {
        res.send(400, {
            errors
        });
    } else {
        var token = jwt.sign({username: registration_info.user_id}, config.jwt.secret);

        res.json(200, {
            token: token
        });
    }
});

server.listen(config.server.port, function() {
    console.log('%s listening at %s', config.server.name, config.server.url);
});
