import express from 'express';
// Packages
const chai = require('chai');

const assert = chai.assert;
let chaiHttp = require('chai-http');
// Controller
const testController = require('../../TestController');

module.exports = function (server, data) {
    describe('/Forgot Password', () => {

        describe('Post', () => {
            it('Success', async () => {
                await chai.request(server)
                    .post('/api/auth/forgot-password')
                    .send(data)
                    .then(value => {
                        assert.propertyVal(value.body, "status", "success");
                        assert.propertyVal(value.body, "code", 200);
                        assert.propertyVal(value.body, "message", 'OK');
                        assert.propertyVal(value.body, "data", "success");
                    })
            });
            describe('Fail', () => {
                describe('Validator', () => {
                    it('Email Validator', (done) => {
                        data = {
                            email: 'test',
                        }
                        chai.request(server)
                            .post('/api/auth/forgot-password')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 400);
                                assert.propertyVal(value.body, "message", 'Bad Request');
                                assert.property(value.body.data, "email");
                                done();
                            })
                    });
                });
                describe('Server', () => {
                    it('Email not Exist', (done) => {
                        data = {
                            email: 'test2@gmail.com',
                        }
                        chai.request(server)
                            .post('/api/auth/forgot-password')
                            .send(data)
                            .then(value => {
                                assert.propertyVal(value.body, "status", "fail");
                                assert.propertyVal(value.body, "code", 404);
                                assert.propertyVal(value.body, "message", 'Not Found');
                                assert.property(value.body, "data");
                                done();
                            })
                    });
                });
            });
        });
    });
}


