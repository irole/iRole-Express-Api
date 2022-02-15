// Controllers
import Controller from "../Controller";
import translate from "../../../helpers/translate";

class GoogleAuthController extends Controller {

    async callBack(req, res, next) {
        try {
            this.login(req, res, req.user, translate(req,__filename,'login-success','Login Success'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new GoogleAuthController();
