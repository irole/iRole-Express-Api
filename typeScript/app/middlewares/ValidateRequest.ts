import {RequestValidationError} from '../errors/RequestValidationError';
import {validationResult} from 'express-validator';

let messages: object = {};
// Middlewares
import Middleware from "./Middleware";

class ValidateRequest extends Middleware {
    handle(req, res, next) {
        messages = {};
        const result = validationResult(req).array();
        if (result.length > 0) { // Error
            result.forEach((item: any) => {
                messages[item.param] = item.msg;
            });
            throw new RequestValidationError(messages);
        }
        next();
    }
}

export default new ValidateRequest();
