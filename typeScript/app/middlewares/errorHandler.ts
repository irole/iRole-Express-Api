import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/CustomError';
import {RequestValidationError} from '../errors/RequestValidationError';

// Logger
import logger from '../helpers/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        if (err instanceof RequestValidationError) {
            return res.status(err.statusCode).send({
                code: err.statusCode, // code : 400
                label: Option['httpStatus'][`s${err.statusCode}`].message, // label : "Bad Request"
                errors: err.data
            });

        } else {
            logger.error(`${err.statusCode || 500} - ${err.data} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(err.statusCode).send({

                code: err.statusCode, // code : 500
                label: Option['httpStatus'][`s${err.statusCode}`].message, // label : "Internal Server Error"
                errors: err.message
                /*
                example:

                errors : {
                message : ' not found ',
                email: 'email not validate',
                password : 'password must more than 8 characters and must Use Capital Case letters'
                }

                */
            });
        }
    }

    res.status(400).send({
        errors: {message: 'Something went wrong'}
    });
};
