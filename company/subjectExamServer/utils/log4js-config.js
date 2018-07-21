const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        console: {type: 'stdout'},
        info2file: {type: 'file', filename: path.resolve(__dirname, '../logs/info2file.log')},
        error2file: {type: 'file', filename: path.resolve(__dirname, '../logs/error2file.log')},
        serverStatus: {type: 'dateFile', filename: path.resolve(__dirname, '../logs/serverStatus.log')}
    },
    categories: {
        file: {
            appenders: ['info2file', 'console'], 
            level: 'info'
        },
        out: {
            appenders: ['console'],
            level: 'trace'
        },
        error: {
            appenders: ['error2file', 'console'],
            level: 'error'
        },
        server: {
            appenders: ['serverStatus', 'console'],
            level: 'debug'
        },
        default: {
            appenders: ['console'],
            level: 'trace'
        }
    }
});

module.exports =  log4js