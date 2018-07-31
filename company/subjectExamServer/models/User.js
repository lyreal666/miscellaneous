const db = require('../utils/db');

module.exports = db.defineModel('users', {
    open_id: {
        type: db.STRING(80), // wxnumber123456 微信号
        unique: true
    },
    collections: {
        type:db.JSON, // '[666, 888, 999]' 收藏了第666, 888, 999题
        unique: false
    },
    subject1right: {
        type: db.JSON, // '[1, 3, 7]' 科目一对了1, 3, 7题
    },
    subject1failed: {
        type: db.JSON, // '[2, 4, 6]' 科目一错了2, 4, 6题
    },
    subject4right: {
        type: db.JSON, // 和楼上一样
    },
    subject4failed: {
        type: db.JSON,
    },
    latest_question1: db.INTEGER,
    latest_question4: db.INTEGER
})