import express from 'express';
// Packages
const passport = require('passport');
// Controllers
import Controller from "./Controller";
// Services
import userService from "../../services/UserService";
// Errors
import {ConflictError} from '../../errors/ConflictError';
import {ServerError} from '../../errors/ServerError';


class RegisterController extends Controller {

    async process(req, res, next) {
        try {
            // Check User Exist
            const result = await userService.checkUserExistWithEmail(req.body.email);
            //if (result) return this.failed('this email is registered before!', res, Option['httpStatus'].s409);
            if (result) throw new ConflictError('this email is registered before!');
            passport.authenticate('local.register', {session: false}, (err, user) => {
                // When res have Error
                if (err) throw new ServerError('server have Error !');
                // Login
                this.login(req, res, user, 'register Success!', 201);
            })(req, res, next);
        } catch (e: any) {
            next(e);
        }
    }

}

export default new RegisterController();
