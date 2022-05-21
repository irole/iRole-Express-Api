// Packages
const passport = require('passport');
// Controllers
import Controller from "./Controller";
// Services
import userService from "../../services/UserService";
// Errors
import {ConflictError} from '../../errors/ConflictError';
import {ServerError} from '../../errors/ServerError';
import translate from "../../helpers/translate";


class RegisterController extends Controller {

    async process(req, res, next) {
        try {
            // get email from body
            const email = req.body.email;
            // Check User Exist
            const result = await userService.checkUserExistWithEmail(email);
            if (result) throw new ConflictError(translate(req,__filename,'process-conflict-email','this email is registered before!'));
            passport.authenticate('local.register', {session: false}, (err, user) => {
                // When res have Error
                if (err) return next(new ServerError(translate(req,__filename,'process-server-error','server have Error !')));
                // Login
                this.login(req, res, user, translate(req,__filename,'process-register-success','Register Success!'), 201);
            })(req, res, next);
        } catch (e: any) {
            next(e);
        }
    }

}

export default new RegisterController();
