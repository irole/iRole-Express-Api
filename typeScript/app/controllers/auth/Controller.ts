// Packages
import {ServerError} from '../../errors/ServerError';

const jwt = require('jsonwebtoken');

// Controllers
import ApiController from "../ApiController";

export default class Controller extends ApiController {

    login(req, res, user, message, statusCode: number = 200) {
        req.login(user, {session: false}, (err: any) => {
            if (err) throw new ServerError('server Error !')
            const token = this.generateToken(user.id);
            // Set Cookie
            let maxAge = 1000 * 60 * 60 * 24 * 10; // 10 Days
            res.cookie('jwt-token', token, {
                maxAge,
                httpOnly: true
            });
            return this.success({
                message,
                token,
            }, res, statusCode);
        });
    }

    generateToken(userId) {
        const expireTime: number = 60 * 60 * 24 * 10;// 10 Day
        return jwt.sign({id: userId}, Option['jwt'].secret_key, {expiresIn: expireTime});
    }

};
