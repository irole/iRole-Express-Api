import {CustomError} from './CustomError';

export class ConflictError extends CustomError {

    constructor(message: string, statusCode: number = 409) {
        super(message);
        this.setStatusCode(statusCode)
    }
}
