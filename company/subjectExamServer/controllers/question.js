const questionService = require('../services/questionService');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');


const selectFields = questionService.viaAttributes.join();

module.exports = {
    'GET /api/questions': async (ctx, next) => {
        try {
            const questions =  await questionService.fetchAllQuestions();
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
    'GET /api/questions/:questionsStart/:questionsEnd': async (ctx, next) => {
        const questions = await questionService
            .queryQuestions(`select ${selectFields} from questions where number between ? and ?`, [~~ctx.params.questionsStart, ~~ctx.params.questionsEnd])
        ctx.rest(questions);
        await next();
    },
    'GET /api/questions/count/:subjectType/': async (ctx, next) => {
        const sqlStr = `select count(*) as count from questions where type=${ctx.params.subjectType}`
        const count = await questionService.queryQuestions(sqlStr, []);
        ctx.rest(count[0]);
        await next();
    }
    
}