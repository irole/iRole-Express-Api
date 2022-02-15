import {CustomError} from './CustomError';

export class RequestValidationError extends CustomError {

    constructor(data: object, statusCode: number = 400) {
        super();
        this.setData(data);
        this.setStatusCode(statusCode);
    }
}
