let redis = require('redis');
client = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const test = async () => {
    client.setAsync('name', 'value').then();
    const value = await client.getAsync('name');
    console.log(value);
}

if (require.main === module) {
    test();
} else {
    
}