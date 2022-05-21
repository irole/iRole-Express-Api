import mongoose from 'mongoose';
import {Server, app} from '../../server';
import {logger} from "../helpers/logger";

const http = require('http');
const config = require('config');

class Application {

    mangoDbName: any = config.DatabaseUrl;
    port = this.normalizePort(config.ApplicationPort || '3000');
    server;
    debug = require('debug')('iRole-Express-Api:server');

    constructor() {
        this.setMongoConnection();
        this.setServer();
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mangoDbName, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            logger.info('connect to mongoDb Database!');
        });
    }

    setServer() {
        new Server();
        /**
         * Create HTTP server.
         */
        this.server = http.createServer(app);
        this.server.listen(process.env.PORT || this.port, () => {
            logger.info(`Server listening on port: ${this.port} Mode = ${process.env.NODE_ENV}`);
        });
        this.server.on('error', this.onError);
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val) {
        const port = parseInt(val, 10);

        if (Number.isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof this.port === 'string'
            ? `pipe ${this.port}`
            : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

new Application();
