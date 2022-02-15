import express from 'express';
// Packages
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('config');
const passport = require('passport');
const i18n = require('i18n');
const logger = require('morgan');
require('dotenv').config();
import {Router} from './app/routes'

export class Server {

    constructor() {
        this.setConfig();
        this.setRoutes();
    }

    setConfig() {
        global.Option = require('./option');
        //if (process.env.NODE_ENV === 'development') app.use(logger('dev'));
        // Passport
        require('./app/passport/passport-local');
        require('./app/passport/passport-jwt');
        // Enable Trust Proxy for web apps e.g. nginx
        // app.enable('trust proxy');

        // Helmet Config
        app.use(helmet({
            // referrerPolicy: false,
            // contentSecurityPolicy: false,
        }));
        // Input Post Values to req.body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        // Setup Session
        app.use(session(Option['session']));
        // Set Cookie in req.cookie
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        // Passport Initialize
        app.use(passport.initialize());
        app.use(passport.session());

        // Translate Config
        // i18n.configure({
        //     locales: ['en', 'fr'],
        //     directory: Option["layout"].locales_directory,
        //     defaultLocale: 'en',
        //     cookie: 'lang',
        //     objectNotation: true
        // })
        // app.use(i18n.init);
    }

    setRoutes() {
        app.use(Router);
    }
}

export {app};
