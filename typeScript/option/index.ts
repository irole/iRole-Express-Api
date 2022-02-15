const fileExt = require('./fileExt');
const layout = require('./layout');
const session = require('./session');
const httpStatus = require('./httpStatus');
const permission = require('./permission');
const role = require('./role');

module.exports = {
    fileExt,
    layout,
    session,
    httpStatus,
    permission,
    role,
    jwt: {
        secret_key: process.env.JWT_SECRETKEY,
    },
};
