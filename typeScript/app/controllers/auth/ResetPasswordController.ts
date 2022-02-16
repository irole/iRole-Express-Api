import express from 'express';
import {NotFoundError} from '../../errors/NotFoundError';
import {ConflictError} from '../../errors/ConflictError';
import {ServerError} from '../../errors/ServerError';
// Controllers
import Controller from "./Controller";
// Services
import userService from "../../services/UserService";
import resetPasswordService from "../../services/ResetPasswordService";
import translate from "../../helpers/translate";
import {ClientError} from "../../errors/ClientError";

class ResetPasswordController extends Controller {
    async index(req, res) {
        const {token} = req.params;
        const resetPassword = await this.checkToken(token);
        if (resetPassword === 404) throw new NotFoundError(translate(req,__filename,'index-invalid-link-404','Invalid Link'));
        if (resetPassword === 403) throw new ClientError(translate(req,__filename,'index-invalid-link-409','Invalid Link'));
        // Do Something
        return this.success('valid-link', res);
    }

    async process(req, res, next) {
        try {
            const {token} = req.params;
            const resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError(translate(req,__filename,'process-invalid-link-404','Invalid Link'));
            if (resetPassword === 403) throw new ClientError(translate(req,__filename,'process-invalid-link-409','Invalid Link'));

            // Get Input Value
            const {password} = req.body;
            // Find & Update User and Set Bcrypt Password
            await userService.findOneAndUpdate(
                {email: resetPassword.email},
                {$set: {password: userService.bcryptPassword(password)}}
            );
            // Find & Update Reset Password and Set use true
            const tokenUsed = await resetPasswordService.tokenUsed(token);
            if (!tokenUsed) throw new ServerError(translate(req,__filename,'process-server-error','server have Error'));
            return this.success(translate(req,__filename,'process-password-changed','Password Changed'), res);
        } catch (e: any) {
            next(e);
        }
    }

    async checkToken(token) {
        const resetPassword = await resetPasswordService.findOne({token});
        if (!resetPassword) return 404;
        if (resetPassword.use) return 403;
        return resetPassword;
    }
}

export default new ResetPasswordController();
