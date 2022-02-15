import {body} from 'express-validator';

import Validator from "../../../Validator";

class RegisterValidator extends Validator {

    handle() {
        return [
            body('email')
                .trim().escape().isEmail()
                .withMessage(() => 'email not validate'),
            body('password')
                .trim().escape().isLength({min: 8})
                .withMessage(() => 'password must more than 8 characters and must Use Capital Case letters'),
        ];
    }
}

export default new RegisterValidator();
