"use strict";

const userService = require('../services/userService');
const questionService = require('../services/questionService');
const serverCFG = require('../configs/server-config');
const requests = require('superagent');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

module.exports = {
    'POST /user/subject1/submitOrderPractice': async (ctx, next) => {
        const open_id = ctx.request.body.open_id;
        const number = ctx.request.body.number;
        const answerStatus = ctx.request.body.answerStatus;

        const user = userService.fetchUserByopen_id(open_id);
        console.log(typeof user.subject1right);
    },
    'POST /api/user/launch': async (ctx, next) => {
        console.log('#request body', ctx.request.body);
        const sqlStr = `select count(*) as count from questions where type=?`
        const subject1count = (await questionService.queryQuestions(sqlStr, [0]))[0].count;
        const subject2count = (await questionService.queryQuestions(sqlStr, [1]))[0].count;

        const openID = ctx.request.body.openID;
        console.log(ctx.request.body);
        const user = await userService.fetchUserByopen_id(openID);

        let resultData = {
            subject1count: subject1count,
            subject2count: subject2count
        };

        
        if (user) {
            resultData.userInfo = {
                ...user,
                isNewUser: false
            }
        } else {
            // 新用户只需要保存open_id
            let newUser = {
                open_id: openID
            }
            await userService.createUser(newUser)
            resultData.userInfo = {
                isNewUser: true
            }
        }
        console.log(`#resultData: ${resultData}`);
        ctx.rest(resultData);
        await next();
    },
    'POST /login': async (ctx, next) => {
        const code = ctx.request.body.code;
        const appKey = serverCFG.appKey;
        const appSecret = serverCFG.appSecret;

        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
        serverLogger.info(`GET uel: ${url}`)
        try {
            const {
                text: authMsg
            } = await requests.get(url);
            console.log(authMsg);
            ctx.response.type = 'application/json';
            ctx.response.body = {
                success: true,
                openID: JSON.parse(authMsg).openid,
                msg: '登入成功'
            }
        } catch (error) {
            errorLogger.error('用户登入获取用户信息时:', error)
            ctx.response.body = {
                success: false,
                openID: '',
                msg: '登入失败'
            }
        }


    }
}