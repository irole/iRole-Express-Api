const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            level: 'error',
            filename: 'logs/server.log',
            format: format.combine(
                format.label({
                    label: `Label🏷️`,
                }),
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss',
                }),
                format.printf((info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple(),
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss',
                }),
                format.printf((info) => `${info.message}`),
            ),
        })
    ],
});
export {logger};
