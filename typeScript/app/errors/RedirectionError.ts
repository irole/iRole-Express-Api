import {CustomError} from "./CustomError";

export class RedirectionError extends CustomError {

    constructor(message: string, statusCode: number = 300) {
        super(message);
        this.setStatusCode(statusCode)
    }
}
