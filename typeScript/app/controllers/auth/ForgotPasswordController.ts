// Packages
import {NotFoundError} from '../../errors/NotFoundError';

const uniqueString = require('unique-string');
// Controllers
import Controller from "./Controller";

// Services
import userService from "../../services/UserService";
import resetPasswordService from "../../services/ResetPasswordService";
import translate from "../../helpers/translate";

class ForgotPasswordController extends Controller {

    async process(req, res, next) {
        try {
            // Get Input Value
            const {email} = req.body;
            // Select User Where Email
            const user = await userService.findOne({email});
            // check user find
            if (!user) throw new NotFoundError(translate(req,__filename,'process-not-found','this email not found'))
            const obj = {
                email,
                token: uniqueString(),
            };
            // Build Reset Password token
            await resetPasswordService.insert(obj);
            // Send Email
            //anything
            //
            return this.success(translate(req,__filename,'process-success','Success'), res);
        } catch (e: any) {
            next(e);
        }
    }

    async sendResetLink(data) {
        return null;
    }
}

export default new ForgotPasswordController();
