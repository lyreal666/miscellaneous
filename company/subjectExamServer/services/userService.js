process.env.NODE_ENV = 'test';

const models = require('../utils/models');
const { sequelize } = require('../utils/db');
const path = require('path');
const fs = require('mz/fs');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const User = models.User;
const viaAttributes = [
    'open_id',
    'collections',
    'subject1right',
    'subject1failed',
    'subject4right',
    'subject4failed',
    'latest_question1',
    'latest_question4'
]


const fetchUserByopen_id = async (open_id) => {
    const user = await User.findOne({
        where: {open_id},
        attributes: viaAttributes
    });
    return user ? user.dataValues : null;
}


const createUser = async (userObj) => {
    const viaFields = [
        ...viaAttributes,
        'id',
        'created_at',
        'updated_at',
        'version'
    ]
    if (!userObj.open_id) {
        throw new Error("Can't create user without openID")
    }

    userObj.collections = userObj.collections || '[]';
    userObj.subject1right = userObj.subject1right || '[]';
    userObj.subject1failed = userObj.subject1failed || '[]';
    userObj.subject4right = userObj.subject4right || '[]';
    userObj.subject4failed = userObj.subject4failed || '[]';
    userObj.latest_question1 = userObj.latest_question1 || 1;
    userObj.latest_question4 = userObj.latest_question4 || 1;

    await User.create(userObj, { fields: viaFields })
}


const query = async (sqlStr, args) => {
    try {
        const rs = await sequelize.query(sqlStr, { replacements: [...args]});
        return true
    } catch(error) {
        serverLogger.error(error)
        return false
    }
}



if (require.main === module) {
    fetchUserByopen_id('oSFfH5Wo-sQrKeNQJ0_LSG4deAes')
} else {
    module.exports = {
        fetchUserByopen_id,
        createUser,
        query
    }
}