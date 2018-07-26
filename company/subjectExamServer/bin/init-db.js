process.env.NODE_ENV = 'test';

const models = require('../utils/models');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const initDatabase = async () => {
    serverLogger.warn(`Init the database`);
    models.sync();
}

initDatabase();