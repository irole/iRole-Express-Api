import express from 'express';
// Packages
const chai = require('chai');

const assert = chai.assert;
let chaiHttp = require('chai-http');
// Controller
const testController = require('../../TestController');
// Services
const resetPasswordService = require('../../../typeScript/app/services/ResetPasswordTokenService');
const userService = require('../../../typeScript/app/services/UserService');

module.exports = function (server, data) {
    describe('/Reset Password', () => {
        describe('Get', () => {
            it('Success', async () => {
                let resetLink = await resetPasswordService.findOne({email: data.email});
                await chai.request(server)
                    .get('/api/auth/reset-password/' + resetLink.token)
                    .then(value => {
                        assert.propertyVal(value.body, "status", "success");
                        assert.propertyVal(value.body, "code", 200);
                        assert.propertyVal(value.body, "message", 'OK');
                        assert.property(value.body, "data");

                    })
                // Check DB
                assert.propertyVal(resetLink, "use", false);
            });
            describe('Fail', () => {
                describe('Validator', () => {
                    it('Token Wrong', async () => {
                        chai.request(server)
                            .get('/api/auth/reset-password/shdbashbdjhasbdhabsjhdb')
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 404);
                                assert.propertyVal(value.body, "message", 'Not Found');
                                assert.property(value.body, "data");
                            })
                    });
                });
                describe('Server', () => {
                    it('Token used', async () => {
                        let resetLink = await resetPasswordService.findOne({email: data.email});
                        resetLink.use = true;
                        await resetLink.save();
                        await chai.request(server)
                            .get('/api/auth/reset-password/' + resetLink.token)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 409);
                                assert.propertyVal(value.body, "message", 'Conflict');
                                assert.property(value.body, "data");
                            })
                        resetLink.use = false;
                        await resetLink.save();
                        let done = await resetPasswordService.findOne({email: data.email});
                        // Check DB
                        assert.propertyVal(done, "use", false);
                    });
                });
            });
        });
        describe('Post', () => {
            it('Success', async () => {
                let resetLink = await resetPasswordService.findOne({email: data.email});
                let newPassword = {
                    password: "87654321"
                }
                await chai.request(server)
                    .post('/api/auth/reset-password/' + resetLink.token)
                    .send(newPassword)
                    .then(value => {
                        assert.propertyVal(value.body, "status", "success");
                        assert.propertyVal(value.body, "code", 200);
                        assert.propertyVal(value.body, "message", 'OK');
                        assert.property(value.body, "data");
                        // Check DB
                    })
                let done = await resetPasswordService.findOne({email: data.email});
                assert.propertyVal(done, "use", true);
                done.use = false;
                await done.save();
            });
            describe('Fail', () => {
                describe('Validator', () => {
                    it('Password Validator', async () => {
                        let resetLink = await resetPasswordService.findOne({email: data.email});
                        let newPassword = {
                            password: 'test',
                        }
                        chai.request(server)
                            .post('/api/auth/reset-password/' + resetLink.token)
                            .send(newPassword)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "password");
                            })
                    });
                });
                describe('Server', () => {
                    it('Token used', async () => {
                        let resetLink = await resetPasswordService.findOne({email: data.email});
                        let newPassword = {
                            password: '87654321',
                        }
                        resetLink.use = true;
                        await resetLink.save();
                        await chai.request(server)
                            .post('/api/auth/reset-password/' + resetLink.token)
                            .send(newPassword)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 409);
                                assert.propertyVal(value.body, "message", 'Conflict');
                                assert.property(value.body, "data");
                            })
                        let done = await resetPasswordService.findOne({email: data.email});
                        assert.propertyVal(done, "use", true);
                        await userService.findOneAndUpdate({email: data.email}, {$set: {password: userService.bcryptPassword(data.password)}});
                    });
                });
            });
        });
    });
}


