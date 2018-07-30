const userService = require('../services/userService');
const questionService = require('../services/questionService');
const serverCFG = require('../configs/server-config');
const requests = require('superagent');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

module.exports = {
    'POST /user/submitOrderPractice': async (ctx, next) => {
        const {
            number,
            openID,
            subject,
            answerStatus,
            selection
        } = ctx.request.body;

        let user = await userService.fetchUserByopen_id(openID);
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        if (user) {
            let modifyField;
            let newItem = {
                number,
                selection
            }
            if (answerStatus.trim() === 'right') {
                if (subject.trim() === '科目一') {
                    const oldSubject1right = user.subject1right.trim();
                    if (oldSubject1right) {
                        user.subject1right = JSON.stringify(JSON.parse(oldSubject1right).push(newItem));
                    } else {
                        user.subject1right = JSON.stringify([newItem])
                    }
                    modifyField = 'subject1right'
                } else {
                    const oldSubject4right = user.subject4right.trim();
                    if (oldSubject4right) {
                        user.subject4right = JSON.stringify(JSON.parse(oldSubject4right).push(newItem));
                    } else {
                        user.subject4right = JSON.stringify([newItem])
                    }
                    modifyField = 'subject4right'
                }
            } else {
                if (subject.trim() === '科目一') {
                    console.log(user);
                    console.log('typeof user.subject1right:', typeof user.subject1failed, user.subject1failed);
                    const oldSubject1failed = user.subject1failed.trim();
                    if (oldSubject1failed) {
                        user.subject1failed = JSON.stringify(JSON.parse(oldSubject1failed).push(newItem));
                    } else {
                        user.subject1failed = JSON.stringify([newItem])
                    }
                    modifyField = 'subject1failed'
                } else {
                    const oldSubject4failed = user.subject4failed.trim();
                    if (oldSubject4failed) {
                        user.subject4failed = JSON.stringify(JSON.parse(oldSubject4failed).push(newItem));
                    } else {
                        user.subject4failed = JSON.stringify([newItem])
                    }
                    modifyField = 'subject4failed'
                }
            }
            console.log('modifyField:' ,modifyField);
            console.log('user[modifyField]:', user[modifyField]);
            let sqlStr = `update users set ${modifyField}=${JSON.stringify(user[modifyField])} where open_id=?`;
            const executeResult = userService.query(sqlStr, [openID])
            ctx.body = {
                success: executeResult
            }
        } else {
            ctx.body = {
                success: true
            }
            throw new Error(`acquire user failed by oenpID ${openID}`)
        }
        await next()
    },
    'POST /api/user/launch': async (ctx, next) => {
        console.log('#request body', ctx.request.body);
        const sqlStr = `select count(*) as count from questions where type=?`
        const subject1count = (await questionService.queryQuestions(sqlStr, [0]))[0].count;
        const subject4count = (await questionService.queryQuestions(sqlStr, [1]))[0].count;

        const openID = ctx.request.body.openID;
        const user = await userService.fetchUserByopen_id(openID);

        let resultData = {
            subject1count,
            subject4count
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