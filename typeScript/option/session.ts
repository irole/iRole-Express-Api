import express from "express";
const config = require('config');
//LOCAL
// const MongoStore = require('connect-mongo').default;
//SERVER
const MongoStore = require('connect-mongo');
module.exports = {
    name: 'iRole-Session',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRETKEY,
    store: MongoStore.create({
        mongoUrl: config.DatabaseUrl,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}
