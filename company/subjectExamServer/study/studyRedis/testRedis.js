let redis = require('redis');
client = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


client.hsetAsync('object', 'name', 'value').then();

client.hgetAsync('object', 'name').then((data) => console.log(data));