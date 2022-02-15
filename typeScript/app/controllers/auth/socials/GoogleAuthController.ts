// Controllers
import Controller from "../Controller";

class GoogleAuthController extends Controller {

    async callBack(req, res, next) {
        try {
            this.login(req, res, req.user, 'login-success');
        } catch (e: any) {
            next(e);
        }
    }
}

export default new GoogleAuthController();
