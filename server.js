import restify from 'restify';
import config from "./config";
import db from "./database";
import {user_login} from './schema';
import jwt from "jsonwebtoken";

var server = restify.createServer();

server.name = config.server.name;
server.version = config.server.version;

server.use(restify.queryParser());
server.use(restify.bodyParser());

console.log("db: ", db);


server.post('/register', function(req, res) {
    let registration_info = {
        user_id: req.body.user_id,
        password: req.body.password
    };
    let errors = user_login.validate(registration_info) || [];
    if (errors && (errors.length > 0)) {
        res.json(400, {
            errors
        });
    } else {
      db.one("insert into user_login(user_id, password) values($1, $2) returning id", [registration_info.user_id, registration_info.password])
      .then( data => {
        console.log("data: ", data);
        var token = jwt.sign({
          username: registration_info.user_id,
          _id: data.id
        }, config.jwt.secret);
        res.json(200, {
            token: token
        });
      })
      .catch(error => {
        console.log("error: ", error);
        res.json(400, error);
      })
    }
});

server.listen(config.server.port, function() {
    console.log('%s listening at %s', config.server.name, config.server.url);
});
