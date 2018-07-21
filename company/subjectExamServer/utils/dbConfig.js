const defaultConfig = '../configs/db-config-default.js';
const overrideConfig = '../configs/db-config-override.js';
const testConfig = '../configs/db-config-test.js';
const serverLogger = require('../utils/log4js-config').getLogger('server');

const fs = require('fs');

const getDBConfig = () => {
    let config = null;

    serverLogger.info(`Load ${defaultConfig}...`)
    config = require(defaultConfig);

    if (process.env.NODE_ENV === 'test') {
        serverLogger.info(`Load ${testConfig}...`)
        config = Object.assign(require(testConfig));
    } else {
        try {
            if (fs.statSync(overrideConfig).isFile()) {
                serverLogger.info(`Load ${overrideConfig}...`)
                config = Object.assign(config, require(overrideConfig));
            }
        } catch (err) {
            serverLogger.error(`Cannot load ${overrideConfig}.`)
        }
    }

    return config;
};

module.exports = getDBConfig();