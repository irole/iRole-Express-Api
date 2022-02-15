// Controllers
import MasterController from "./MasterController";

export default class ApiController extends MasterController {

    success(data: any, res, statusCode: number = 200) {
        const httpStatus = Option['httpStatus'][`s${statusCode}`];
        res.status(httpStatus.code).json({
            status: 'success',
            code: httpStatus.code,
            message: httpStatus.message,
            data,
        });
    }
};
