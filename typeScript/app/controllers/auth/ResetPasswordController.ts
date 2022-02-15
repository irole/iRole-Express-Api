import express from 'express';
import {NotFoundError} from '../../errors/NotFoundError';
import {ConflictError} from '../../errors/ConflictError';
import {ServerError} from '../../errors/ServerError';
// Controllers
import Controller from "./Controller";
// Services
import userService from "../../services/UserService";
import resetPasswordService from "../../services/ResetPasswordService";

class ResetPasswordController extends Controller {
    async index(req, res) {
        const resetPassword = await this.checkToken(req.params.token);
        if (resetPassword === 404) throw new NotFoundError("invalid-link");
        if (resetPassword === 409) throw new ConflictError('invalid-link');
        // Do Something
        return this.success('valid-link', res);
    }

    async process(req, res, next) {
        try {
            const {token} = req.params;
            const resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError("invalid-link");
            if (resetPassword === 409) throw new ConflictError('invalid-link');

            // Get Input Value
            const newPassword = req.body.password;

            // Find & Update User and Set Bcrypt Password
            await userService.findOneAndUpdate(
                {email: resetPassword.email},
                {$set: {password: userService.bcryptPassword(newPassword)}}
            );
            // Find & Update Reset Password and Set use true
            const tokenUsed = await resetPasswordService.tokenUsed(token);
            if (!tokenUsed) throw new ServerError("server have Error");
            return this.success('password changed', res);
        } catch (e: any) {
            next(e);
        }
    }

    async checkToken(token) {
        const resetPassword = await resetPasswordService.findOne({token});
        if (!resetPassword) return 404;
        if (resetPassword.use) return 409;
        return resetPassword;
    }
}

export default new ResetPasswordController();
