const {body} = require('express-validator');

import Validator from "../../../Validator";

class LoginValidator extends Validator {

    handle() {
        return [
            body('password')
                .trim().escape().isLength({min: 8})
                .withMessage(() => 'password must more than 8 characters and must Use Capital Case letters'),
        ];
    }
}

export default new LoginValidator();
