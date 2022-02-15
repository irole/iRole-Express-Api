import express from 'express';
import {ClientError} from '../../errors/ClientError';

// Packages
const passport = require('passport');
// Controllers
import Controller from "./Controller";

class LoginController extends Controller {

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', {session: false}, (err, user) => {
                // When res have Error
                if (err && err.code === 401) throw new ClientError('username or password is wrong!', 401)
                // Login
                this.login(req, res, user, 'login Success!');
            })(req, res);

        } catch (e: any) {
            next(e);
        }
    }
}

export default new LoginController();
