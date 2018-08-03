const redis = require('redis');
let client = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const userService = require('../services/userService');
const questionService = require('../services/questionService');

const configRedis = async () => {
    const sqlStr = `select ${ questionService.viaAttributes.join(',') } from questions where subject=? order by number`;
    const questions1 = await questionService.queryQuestions(sqlStr, [1]);
    await client.setAsync('qc1', questions1.length);
    await client.setAsync('subject1questions', JSON.stringify(questions1));

    const questions4 = await questionService.queryQuestions(sqlStr, [4]);
    await client.setAsync('qc4', questions4.length);
    await client.setAsync('subject4questions', JSON.stringify(questions4));
};

if (require.main === module) {
    configRedis();
} else {
    serverLogger.info('Config redis ...');
    configRedis();
    let redisClient = client;
    module.exports = redisClient;
}