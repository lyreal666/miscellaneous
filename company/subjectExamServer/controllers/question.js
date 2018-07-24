const questionService = require('../services/questionService');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');


module.exports = {
    'GET /api/questions': async (ctx, next) => {
        try {
            const questions =  await questionService.fetchAllQuestions();
            ctx.rest({
                count: questions.length,
                questions
            });
            next();
        } catch (e) {
            errorLogger.error('Fetch all questions occur exception, error: ', e);
            let error = new Error();
            error.code = 'Database exception';
            error.message = "Can't get all question from database";
            throw error
        }
    },
    'GET /api/questions/:questionNumber': async (ctx, next) => {
        const question = await questionService.fetchQuestionsByNumber(ctx.params.questionNumber);
        ctx.rest(question);
        next();
    }
}