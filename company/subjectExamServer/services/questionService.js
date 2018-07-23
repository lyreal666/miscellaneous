process.env.NODE_ENV = 'test';

const models = require('../utils/models');
const path = require('path');
const fs = require('mz/fs');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

Question = models.Question;

const initQuestionTable = async () => {
    const filePath = path.resolve(__dirname, '../public/assets/questions.json');
    const content = await fs.readFile(filePath, {
        encoding: 'utf-8'
    });
    let questions = JSON.parse(content);
    questions = questions.map(element => {
        element.options = element.options.join('&&');
        return element;
    })

    // console.log(await Question.findAll());
    try {
        await Question.bulkCreate(questions);
        // console.log('here', await Question.findAll());
    } catch (e) {
        errorLogger.error('初始化Question表:', e)
    }
};

const fetchAllQuestions = async () => {
    try {
        const allQuestion = await Question.findAll({
            attributes: [
                'number',
                'subject',
                'car_types',
                'chapter',
                'type',
                'answer',
                'hasPic',
                'title',
                'options',
                'detail',
            ]
        });
        return allQuestion;
    } catch (e) {
        errorLogger.error('FetchAllQuestions:', e);
    }
}

const fetchOneQuestion = async () => {
    
}



if (require.main === module) {
    Promise.resolve(initQuestionTable());
    Question.sync();
    Question.findAll().then(data => {
        console.log('data:', data);
    })
} else {
    module.exports = {
        fetchAllQuestions,
    }
}