const questionService = require('../services/questionService');
let redisClient = require('../configs/redis-config');
const Chance = require('chance');
let chance = new Chance();
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');


const selectFields = questionService.viaAttributes.join();

module.exports = {
    'GET /api/questions': async (ctx, next) => {
        try {
            const questions = await questionService.fetchAllQuestions();
            ctx.rest({
                count: questions.length,
                questions
            });
            await next();
        } catch (e) {
            errorLogger.error('Fetch all questions occur exception, error: ', e);
            let error = new Error();
            error.code = 'Database exception';
            error.message = "Can't get all question from database";
            throw error
        }
    },
    'GET /api/questions/:questionNumber': async (ctx, next) => {
        const questions = await questionService.fetchQuestionsByNumber(ctx.params.questionNumber);
        ctx.rest(question);
        await next();
    },
    'GET /api/questions/count/:subjectType/': async (ctx, next) => {
        const sqlStr = `select count(*) as count from questions where type=${ctx.params.subjectType}`
        const count = await questionService.queryQuestions(sqlStr, []);
        ctx.rest(count[0]);
        await next();
    },
    'POST /api/questions/range': async (ctx, next) => {
        const {
            subject,
            start,
            end
        } = ctx.request.body;
        const sqlStr = `select ${selectFields} from questions where subject=? order by number limit ?, ?`;
        try {
            const questions = await questionService
                .queryQuestions(sqlStr, [subject, start - 1, end - start + 1]);
            ctx.rest(questions);
            await next();
        } catch (error) {
            errorLogger.warn('范围读取题库出现问题');
            errorLogger.error(error);
        }
    },
    'POST /api/questions/numbers': async (ctx, next) => {
        const { subject, numbers } = ctx.request.body;

        const questions = JSON.parse(await redisClient.getAsync(`subject${ subject }questions`));
        const randomQuestions = numbers.map(number => questions[number - 1]);
        ctx.rest(randomQuestions);
        await next();
    }
}