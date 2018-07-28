process.env.NODE_ENV = 'test';

const models = require('../utils/models');
const path = require('path');
const fs = require('mz/fs');
const { sequelize } = require('../utils/db');
const serverLogger = require('../utils/log4js-config').getLogger('server');
const errorLogger = require('../utils/log4js-config').getLogger('error');

const User = models.User;
const viaAttributes = [
    'open_id',
    'collections',
    'subject1right',
    'subject1failed',
    'subject4right',
    'subject4failed'
]


const fetchUserByopen_id = async (open_id) => {
    const user = await User.findOne({
        where: {open_id},
        attributes: viaAttributes
    });
    
    return user.dataValues;
}

const createUser = async (userObj) => {
    const viaFields = [
        ...viaAttributes,
        'id',
        'created_at',
        'updated_at',
        'version'
    ]
    for (let key of viaFields) {
        if (!userObj[key]) {
            // 目前创建新用户open_id号一定存在,其它都是json类型
            userObj[key] = '{}';
        }
    }
    await User.create(userObj, { fields: viaFields })
}


if (require.main === module) {
    fetchUserByopen_id('123456888')
} else {
    module.exports = {
        fetchUserByopen_id,
        createUser
    }
}