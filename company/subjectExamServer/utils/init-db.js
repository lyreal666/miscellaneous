process.env.NODE_ENV = 'test';

const models = require('./models');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');


const initDatabase = async () => {
    serverLogger.warn(`Init the database`);
    await models.sync();
}

initDatabase().then(() => {
    process.exit(0)
}).catch((error) => errorLogger.error(error));