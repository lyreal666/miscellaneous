/*
 * @Author: ytj 
 * @Date: 2018-07-20 10:37:46 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-25 09:29:39
 */

const path = require('path');
const Koa2 = require('koa');
const accessServerLog = require('./middleware/accessServerLog');
const staticServer = require('koa-static');
const bodyParser = require('koa-bodyparser');
const restify = require('./middleware/restify');
const controller = require('./middleware/controller');

let server = new Koa2();

process.env.NODE_ENV = 'test';

const log4js = require('./utils/log4js-config');
const serverLogger = log4js.getLogger('serverStatus');
const errorLogger = log4js.getLogger('error');


server.use(accessServerLog);

const staticServerConfigs =[
    { relativePath: './static', options: { index: 'index.html'} },
] 
staticServerConfigs.forEach(config => {
    const absPath = path.resolve(__dirname, config.relativePath);
    serverLogger.info(`Use absPath: ${absPath} as static server path`)
    server.use(staticServer(absPath, config.options))
})

server.use(bodyParser());
server.use(restify('/api/'));
server.use(controller(path.resolve(__dirname, './controllers')));

const port = 8848;
serverLogger.info(`Server is running in http://127.0.0.1:${port}/`);
server.listen(port);
