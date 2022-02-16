import express from 'express';
import {ClientError} from '../../errors/ClientError';

// Packages
const passport = require('passport');
// Controllers
import Controller from "./Controller";
import translate from "../../helpers/translate";

class LoginController extends Controller {

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', {session: false}, (err, user) => {
                // When res have Error
                if (err) return next(new ClientError(translate(req, __filename, 'process-inf-wrong', 'username or password is wrong!'), 401));
                // Login
                this.login(req, res, user, translate(req, __filename, 'process-login-success', 'login Success!'));
            })(req, res);

        } catch (e: any) {
            next(e);
        }
    }
}

export default new LoginController();
