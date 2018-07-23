const defaultConfig = '../configs/db-config-default.js';
const overrideConfig = '../configs/db-config-override.js';
const testConfig = '../configs/db-config-test.js';
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');
const fs = require('fs');

const getDBConfig = () => {
    let config = null;

    serverLogger.info(`Load ${defaultConfig}...`)
    config = require(defaultConfig);

    if (process.env.NODE_ENV === 'test') {
        serverLogger.info(`Load ${testConfig}...`)
        config = Object.assign(config, require(testConfig));
    } else {
        try {
            if (fs.statSync(overrideConfig).isFile()) {
                serverLogger.info(`Load ${overrideConfig}...`)
                config = Object.assign(config, require(overrideConfig));
            }
        } catch (err) {
            errorLogger.error(`Cannot load ${overrideConfig}.`)
        }
    }
    serverLogger.info('DB configuration:', config);

    return config;
};

module.exports = getDBConfig();