const userService = require('../services/userService');
const questionService = require('../services/questionService');
const serverCFG = require('../configs/server-config');
const requests = require('superagent');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

module.exports = {
    'POST /api/user/submitOrderPractice': async (ctx, next) => {
        const {
            number,
            openID,
            subject,
            answerStatus,
            selection
        } = ctx.request.body;

        let user = await userService.fetchUserByopen_id(openID);
        if (user) {
            let modifyField;
            let newItem = {
                number,
                selection
            }
            if (answerStatus) {
                if (subject === '科目一') {
                    const oldSubject1right = user.subject1right;
                    if (oldSubject1right === '[]') {
                        user.subject1right = [newItem]
                    } else {
                        user.subject1right = [...oldSubject1right, newItem];
                    }
                    modifyField = 'subject1right'
                } else {
                    const oldSubject4right = user.subject4right;
                    if (oldSubject4right === '[]') {
                        user.subject4right = [newItem]
                    } else {
                        user.subject4right = [...oldSubject4right, newItem];
                    }
                    modifyField = 'subject4right'
                }
            } else {
                if (subject === '科目一') {
                    const oldSubject1failed = user.subject1failed;
                    if (oldSubject1failed === '[]') {
                        user.subject1failed = [newItem]
                    } else {
                        user.subject1failed = [...oldSubject1failed, newItem];
                    }
                    modifyField = 'subject1failed'
                } else {
                    const oldSubject4failed = user.subject4failed;
                    if (oldSubject4failed === '[]') {
                        user.subject4failed = [newItem]
                    } else {
                        user.subject4failed = [...oldSubject4failed, newItem];
                    }
                    modifyField = 'subject4failed'
                }
            }
            let sqlStr = `update users set ${modifyField}=? where open_id=?`;
            // 去除重复item
            let resultArray = [];
            for (const item of user[modifyField]) {
                let flag = true;
                for (const innerItem of resultArray) {
                    if (innerItem.number === item.number) {
                        flag = false;
                    }
                }
                if (flag) {
                    resultArray.push(item)
                }
            }
            userService.query(sqlStr, [JSON.stringify(resultArray), openID])
            ctx.rest({})
        } else {
            throw new Error(`acquire user failed by oenpID ${openID}`)
        }
        await next()
    },
    'POST /api/user/launch': async (ctx, next) => {
        const sqlStr = `select count(*) as count from questions where subject=?`
        const subject1count = (await questionService.queryQuestions(sqlStr, [0]))[0].count;
        const subject4count = (await questionService.queryQuestions(sqlStr, [4]))[0].count;

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
        await next();
    },
    'POST /api/user/collection': async (ctx, next) => {
        const { openID, number } = ctx.request.body;
        let user = await userService.fetchUserByopen_id(openID);
        if (user) {
            const newCollections = user.collections === '[]' ? [number] : Array.from(new Set([...user.collections, number]));
            const sqlStr = `update users set collections=? where open_id=?`;
            await userService.query(sqlStr, [JSON.stringify(newCollections), openID]);
            ctx.rest({})
            await next()
        } else {
            throw new Error(`acquire user failed by oenpID ${openID}`)
        }
    },
    'POST /api/user/latestQuestion': async (ctx, next) => {
        const { subject, latestQuestion } = ctx.request.body;
        console.log(ctx.request.body);
        const sqlStr = `update users set ${ subject === 1 ? 'latest_question1' : 'latest_question4'}=?`
        try {
            await userService.query(sqlStr, [latestQuestion]);
            ctx.rest({})
            await next()
        } catch(error) {
            errorLogger.error(error);
            throw new Error('获取用户上次做题位置出错');
        }
        
    },
    'POST /api/user/questionDelete': async (ctx, next) => {
        const { openID, operation, subject } = ctx.request.body;
        if (operation === 'delete question recording') {
            const sqlStr = `update users set ${subject === 1 ? 'subject1right="[]",subject1failed="[]",latest_question1=1' : 'subject4right="[]",subject4failed="[]",latest_question4=1'} where open_id=?`

            try {
                await userService.query(sqlStr, [openID]);
                ctx.rest({})
                await next()
            } catch(error) {
                errorLogger.error(error);
                throw new Error('清除用户答题记录出错');
            }
            
        }
       
    }

}