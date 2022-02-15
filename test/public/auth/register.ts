import express from "express";
// Packages
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
// Controller
const testController = require('../../TestController');


module.exports = function (server, data) {
    describe('/Register', () => {

        describe('Post', () => {
            it('Success', async () => {
                await testController.register(server, data);
            });
            describe('Fail', () => {
                describe('Validator', () => {
                    it('email validator', async () => {
                        data = {
                            email: 'test',
                            password: '123456',
                        }

                        await chai.request(server)
                            .post('/api/auth/register')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "email");
                            })
                    });
                    it('password validator', (done) => {
                        data = {
                            email: 'test@gmail.com',
                            password: '    12',
                        }

                        chai.request(server)
                            .post('/api/auth/register')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "password");
                                done()
                            })
                    });
                });
                describe('Server', () => {
                    it('User Exist', async () => {
                        let data = {
                            email: 'test@irole.group',
                            password: '12345678',
                        }

                        await chai.request(server)
                            .post('/api/auth/register')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 409);
                                assert.propertyVal(value.body, "message", 'Conflict');
                                assert.property(value.body, "data");
                            })
                    });
                });
            });
        });
    });
}


