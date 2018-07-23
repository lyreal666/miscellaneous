const serverLogger = require('../utils/log4js-config').getLogger('server');

module.exports = async (ctx, next) => {
    serverLogger.info(`Process ${ctx.request.method} ${ctx.url}...`)
    const startTime = +new Date();
    await next();
    const endTime = +new Date();
    const responseTime = endTime - startTime;
    serverLogger.info(`Response ${ctx.request.method} ${ctx.url} cost ${responseTime}ms`)
    ctx.response.set('X-Response-Time', `${responseTime}ms`);
}