import {CustomError} from "./CustomError";

export class ClientError extends CustomError {

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.setStatusCode(statusCode)
    }
}
