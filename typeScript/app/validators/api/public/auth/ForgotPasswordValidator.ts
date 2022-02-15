import Validator from "../../../Validator";
import translate from "../../../../helpers/translate";

const {body} = require('express-validator');

class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('email')
            .trim()
            .escape()
            .isEmail()
            .withMessage((value, {
                req,
                location,
                path
            }) => {
                return translate(req, __filename, 'email-validate', 'email not valid');
            }),
        ];
    }
}

export default new ForgotPasswordValidator();
