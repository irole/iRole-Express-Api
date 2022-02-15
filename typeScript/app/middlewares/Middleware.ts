// Packages
const autoBind = require('auto-bind');

export default class Middleware {

    constructor() {
        autoBind(this);
    }
};
