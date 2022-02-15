import express from 'express';

const autoBind = require('auto-bind');

export default class Validator {

    constructor() {
        autoBind(this);
    }
};
