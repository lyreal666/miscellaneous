const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

module.exports = (pathPrefix='/api/') => {
    return async (ctx, next) => {
        // 是否是REST API前缀?
        if (ctx.request.path.startsWith(pathPrefix)) {
            // 绑定rest()方法:
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    success: true,
                    code: 666,
                    data,
                    message: 'request ok'
                }
            }
            try {
                await next();
            } catch(e) {
                // 返回错误:
                errorLogger.error(e)
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    success: false,
                    code: e.code || 'internal:unknown_error',
                    data: {},
                    message: e.message || ''
                };
            }
            
        } else {
            await next();
        }
    };
}