// Controllers
import Controller from "../Controller";

class FacebookAuthController extends Controller {

    callBack(req, res, next) {
        try {

        } catch (e: any) {
            next(e);
        }
    }
}

export default new FacebookAuthController();
