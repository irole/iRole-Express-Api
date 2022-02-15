import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const autoBind = require('auto-bind');
let chaiHttp = require('chai-http');

// Middleware
chai.use(chaiHttp);

class TestController {

    constructor() {
        autoBind(this);
    }

    async login(server, data) {
        return await chai.request(server)
            .post('/api/auth/login')
            .send(data)
            .then(value => {
                assert.propertyVal(value.body, "status", "success");
                assert.propertyVal(value.body, "code", 200);
                assert.propertyVal(value.body, "message", 'OK');
                assert.propertyVal(value.body.data, "message", 'login Success!');
                assert.property(value.body.data, "token");
                return value.body.data.token;
            })
    }

    async register(server, data) {
        return await chai.request(server)
            .post('/api/auth/register')
            .send(data)
            .then(value => {
                assert.propertyVal(value.body, "status", "success");
                assert.propertyVal(value.body, "code", 200);
                assert.propertyVal(value.body, "message", 'OK');
                assert.propertyVal(value.body.data, "message", 'register Success!');
                assert.property(value.body.data, "token");
                return value.body.data.token;
            })
    }
}

module.exports = new TestController();
