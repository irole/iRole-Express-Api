import autoBind from 'auto-bind';

interface CustomErrorInterface {
    statusCode: number;
    data: any;
}

export class CustomError extends Error implements CustomErrorInterface {
    statusCode!: number;
    data!: any;

    constructor(message: string = '') {
        super(message);
        autoBind(this);
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    getStatus() {
        return this.statusCode;
    }

}
