import {CustomError} from './CustomError';

export class NotFoundError extends CustomError {

    constructor(message: string, statusCode: number = 404) {
        super(message);
        this.setStatusCode(statusCode);
    }
}
