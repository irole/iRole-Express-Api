process.env.NODE_ENV = 'test';
// Packages
import mongoose from 'mongoose';
import {step} from "mocha-steps";
require('module-alias/register');
const config = require('config');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('@typeScript/server');

const app = server.app;

// Middleware
chai.use(chaiHttp);
// Variables
let token: string = '';
let userData = {
    email: 'test@irole.group',
    password: '12345678',
}

describe('Testing', async () => {

    step('Drop Database', (done) => {

        mongoose.connection.db.dropDatabase((error, result) => {
            if (result) done();
            if (error) console.log(error.message);
        })
    });
    step('all test run', async () => {
        require('../test/public/auth/register')(app, userData);
        require('../test/public/auth/login')(app, userData);
        require('../test/public/auth/forgotPassword')(app, userData);
        require('../test/public/auth/resetPassword')(app, userData);
    });
});
