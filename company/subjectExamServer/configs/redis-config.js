const redis = require('redis');
client = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const userService = require('../services/userService');

const configRedis = async () => {
    const qcQR = await userService.query('select count(*) as counts from questions', []);
    const questionsCount = qcQR[0][0]['counts']
    await client.setAsync('questionsCount', questionsCount);

    const subject1count = (await questionService.queryQuestions(sqlStr, [0]))[0].count;
    const subject4count = (await questionService.queryQuestions(sqlStr, [4]))[0].count;
    await client.setAsync('qc1', subject1count);
    await client.setAsync('qc4', subject4count);

}

if (require.main === module) {
    configRedis();
} else {
    configRedis();
    let redisClient = client;
    module.exports = redisClient;
}