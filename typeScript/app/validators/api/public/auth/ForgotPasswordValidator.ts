import Validator from "../../../Validator";

const {body} = require('express-validator');

class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('email')
                .trim().escape().isEmail()
                .withMessage(() => 'email not valid'),
        ];
    }
}

export default new ForgotPasswordValidator();
