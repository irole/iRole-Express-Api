import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// Controller
const testController = require('../../TestController');

module.exports = function (server, data) {

    describe('/Login', () => {

        describe('Post', () => {
            it('Success', async () => {
                await testController.login(server, data);
            });
            describe('Fail', () => {
                describe('Validator', () => {
                    it('email validator', (done) => {
                        data = {
                            email: 'test',
                            password: '12345678'
                        }
                        chai.request(server)
                            .post('/api/auth/login')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "email");
                                done();
                            })
                    });
                    it('password validator', (done) => {
                        data = {
                            email: "test@irole.group",
                            password: '123'
                        }
                        chai.request(server)
                            .post('/api/auth/login')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "password");
                                done();
                            })
                    });
                });
                describe('Server', () => {
                    it('Email wrong', (done) => {
                        data = {
                            email: "test2@irole.group",
                            password: '12345678'
                        }
                        chai.request(server)
                            .post('/api/auth/login')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 401);
                                assert.propertyVal(value.body, "message", 'Unauthorized');
                                assert.property(value.body, "data");
                                done();
                            })
                    });
                    it('Password wrong', (done) => {
                        data = {
                            email: "test@irole.group",
                            password: '87654321'
                        }
                        chai.request(server)
                            .post('/api/auth/login')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 401);
                                assert.propertyVal(value.body, "message", 'Unauthorized');
                                assert.property(value.body, "data");
                                done();
                            })
                    });
                });
            });
        });
    });
}


