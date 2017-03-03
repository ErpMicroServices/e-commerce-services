import restify from 'restify';
import config from "../config";
import db from "../database";
import {
    user_login
} from '../schema';
import jwt from "jsonwebtoken";

export function authenticate_user(req, res) {
    let login = {
        user_id: req.body.user_id,
        password: req.body.password
    }

    let errors = user_login.validate(login);

    if (errors.length > 0) {
        res.json(400, errors.map((err) => {
            return {
                path: err.path,
                message: err.message
            }
        }));
    } else {
        db.one("select id, user_id, password from user_login where user_id = $1 and password=$2", [login.user_id, login.password])
            .then(data => {
                var token = jwt.sign({
                    username: login.user_id,
                    _id: data.id
                }, config.jwt.secret);
                res.json(200, {
                    token: token
                });
            })
            .catch(error => {
                let errors = [];
                errors.push({
                    path: '',
                    message: error.message
                });
                res.json(400, errors);
            });
    }
}

export function register_user(req, res) {
    let registration_info = {
        user_id: req.body.user_id,
        password: req.body.password
    };

    let errors = user_login.validate(registration_info);

    if (errors.length > 0) {
        res.json(400, errors.map((err) => {
            return {
                path: err.path,
                message: err.message
            }
        }));
    } else {
        db.one("insert into user_login(user_id, password) values($1, $2) returning id", [registration_info.user_id, registration_info.password])
            .then(data => {
                var token = jwt.sign({
                    username: registration_info.user_id,
                    _id: data.id
                }, config.jwt.secret);
                res.json(200, {
                    token: token
                });
            })
            .catch(error => {
                let errors = []
                if (error.message.includes('user_login_user_id_key')) {
                    errors.push({
                        path: '',
                        message: "A user with the given username is already registered"
                    })
                } else {
                    errors.push({
                        path: '',
                        message: error.message
                    });
                }
                res.json(400, errors);
            })
    }
}
