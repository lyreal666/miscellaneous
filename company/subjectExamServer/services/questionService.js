process.env.NODE_ENV = 'test';

const models = require('../utils/models');
const path = require('path');
const fs = require('mz/fs');
const { sequelize } = require('../utils/db');
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
        element.subject  = element.subject.trim() === '科目一' ? 1 : 4;
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

const viaAttributes = [
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
];

const fetchAllQuestions = async () => {
    try {
        const allQuestion = await Question.findAll({
            attributes: viaAttributes
        });
        return allQuestion;
    } catch (e) {
        errorLogger.error('FetchAllQuestions:', e);
    }
}

const queryQuestions = async (sqlStr, arguments) => {
    const questions = await sequelize
        .query(sqlStr, { replacements: [...arguments], type: sequelize.QueryTypes.SELECT });
}

const fetchQuestionsByNumber = async (number) => {
    const question = await Question.findOne({
        where: {number} ,
        attributes: viaAttributes
    });
    return question;
}



if (require.main === module) {
    // fetchQuestions('select title from questions where number = ?', [100]);
    initQuestionTable();
} else {
    module.exports = {
        fetchAllQuestions,
        queryQuestions,
        fetchQuestionsByNumber
    }
}