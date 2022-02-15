// Packages
const passport = require('passport');
const passportJWT = require('passport-jwt');
// Service
import userService from "../services/UserService";
// Passport Strategy
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt-token'];
    return token;
};
passport.use('jwt', new JWTStrategy({
    // jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromUrlQueryParameter('api_token')]),
    // ExtractJwt.fromExtractors([(req) => get(req, 'cookies.access-token')])
    // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // jwtFromRequest: ExtractJWT.fromExtractors([(req) => get(req, 'cookies.access-token')]),
    jwtFromRequest: cookieExtractor,
    secretOrKey: Option['jwt'].secret_key,
}, async (jwtPayload, done) => {
    let error: any = {code: 100, message: '', status: false};
    try {

        // Select User by Id
        const user = await userService.findById(jwtPayload.id);
        // User is Exist
        if (user) return done(false, user);
        // User Not Found
        error.message = 'You do not have permission to access this link';
        error.code = 401;
        error.status = true;
        return done(error, null);
    } catch (err: any) {
        error.message = 'Server Error !';
        error.code = 500;
        error.status = true;
        done(error, null);
    }

}));
