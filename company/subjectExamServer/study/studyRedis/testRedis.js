let redis = require('redis');
client = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


client.setAsync('name', 'value').then();

client.getAsync('name').then((data) => console.log(data));