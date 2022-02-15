const {body} = require('express-validator');

import Validator from "../../../Validator";

class LoginValidator extends Validator {

    handle() {
        return [
            body('email')
                .trim().escape().isEmail()
                .withMessage(() => 'email not valid'),
            body('password')
                .trim().escape().isLength({min: 8})
                .withMessage(() => 'password must be at least 8 character'),
        ];
    }
}

export default new LoginValidator();
