"use strict";

const userService = require('../services/userService');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

module.exports = {
    'POST /user/subject1/submitOrderPractice': async (ctx, next) => {
        const wx = ctx.request.body.wx;
        const number = ctx.request.body.number;
        const answerStatus = ctx.request.body.answerStatus;

        const user = userService.fetchUserByWX(wx);
        console.log(typeof user.subject1right);
    },
    'POST /user/launch': async (ctx, next) => {
        
    }
}