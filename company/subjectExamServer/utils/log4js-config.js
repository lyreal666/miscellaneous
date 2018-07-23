/*
 * @Author: ytj 
 * @Date: 2018-07-21 08:29:18 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-21 09:12:52
 */

// 官方配置地址https://github.com/log4js-node/log4js-node/blob/master/examples/log-to-files.js

const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        console: {
            type: 'stdout'
        },
        info2file: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/info2file.log')
        },
        error2file: {
            type: 'dateFile',
            filename: path.resolve(__dirname, '../logs/error2file.log'),
            maxLogSize: 10 * 1024 * 1024, // = 10Mb
            pattern: 'yyyy-MM-dd-hh',
            compress: true,
            encoding: 'utf-8',
        },
        serverStatus: {
            type: 'dateFile',
            filename: path.resolve(__dirname, '../logs/serverStatus.log'),
            maxLogSize: 10 * 1024 * 1024, // = 10Mb
            compress: true, // compress the backups
            encoding: 'utf-8',
        }
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

const serverLogger = log4js.getLogger('server');

module.exports = log4js