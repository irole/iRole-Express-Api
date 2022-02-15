import translate from "../../../../helpers/translate";

const {body} = require('express-validator');

import Validator from "../../../Validator";

class LoginValidator extends Validator {

    handle() {
        return [
            body('email')
            .trim()
            .escape()
            .isEmail()
            .withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'email-validate','email not valid');
            }),
            body('password')
            .trim()
            .escape()
            .isLength({min: 8})
            .withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'password-valid','password must more than 8 characters');
            }),
        ];
    }
}

export default new LoginValidator();
