const models = require('../utils/models');
const path = require('path');
const fs = require('mz/fs');
const { sequelize } = require('../utils/db');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const User = models.User;

const createUser = async (userInfo) => {
    
}

const fetchOneUser = async () => {

}


if (require.main === module) {
} else {
    module.exports = {
    }
}