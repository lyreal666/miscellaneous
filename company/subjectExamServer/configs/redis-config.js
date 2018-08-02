const redis = require('redis');
let client = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const userService = require('../services/userService');
const questionService = require('../services/questionService');

const updateRandomQuestions =  async () => {
    const sqlStr = `select ${ questionService.viaAttributes.join(',') } from questions where subject=?`;
    const questions1 = await questionService.queryQuestions(sqlStr, [1]);
    questions1.sort(() => {
        return 0.5 - Math.random()
    });
    await client.setAsync('randomSubject1questions', JSON.stringify(questions1));

    const questions4 = await questionService.queryQuestions(sqlStr, [4]);
    questions4.sort(() => {
        return 0.5 - Math.random()
    });
    await client.setAsync('randomSubject4questions', JSON.stringify(questions4));
}

const configRedis = async () => {
    const qcQR = await userService.query('select count(*) as counts from questions', []);
    const questionsCount = qcQR[0][0]['counts'];
    await client.setAsync('questionsCount', questionsCount);

    const sqlStr = `select count(*) as count from questions where subject=?`;
    const subject1count = (await questionService.queryQuestions(sqlStr, [1]))[0].count;
    const subject4count = (await questionService.queryQuestions(sqlStr, [4]))[0].count;
    await client.setAsync('qc1', subject1count);
    await client.setAsync('qc4', subject4count);
};

if (require.main === module) {
    configRedis();
} else {
    serverLogger.info('Config redis ...');
    configRedis();
    let redisClient = client;
    module.exports = redisClient;
}