// Packages
import express from 'express';

const RateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json');
// Errors
import {NotFoundError} from '../errors/NotFoundError'
// MiddleWares
import {errorHandler} from '../middlewares/errorHandler';
import AuthenticateApi from "../middlewares/AuthenticateApi";

const router = express.Router();
// Routes
import {publicRouter} from "./public";
import {privateRouter} from "./private";


// ------------- Api Limiter -------------------
let max: number = 40;
if (process.env.NODE_ENV === 'test') max = 1000;
const apiLimiter = new RateLimit({
    windowMs: 1000 * 60 * 5,
    max,
    handler: function (req, res) {
        res.json({
            data: 'Your request is too much. Please try again in 15 minutes later',
            status: 'error',
        });
    },
});
//----------------------------------------------

router.use(AuthenticateApi.public);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// APIs
router.use('/api', cors(), apiLimiter, publicRouter);
router.use('/api', cors(), AuthenticateApi.private, apiLimiter, privateRouter);

// Error 404
router.all('*', (req, res, next) => {
    throw new NotFoundError('Not Found');
});
router.use(errorHandler);
export {router as Router};
