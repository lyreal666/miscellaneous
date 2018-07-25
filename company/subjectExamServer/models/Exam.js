const db = require('../utils/db');

module.exports = db.defineModel('exams', {
    wx: {
        type: db.STRING(80), // 微信号
        unique: true
    },
    subject: {
     	type: db.INTEGER, // 1/4  // 科目一或科目四
        unique: false
    },
    handed_time: {
        type: db.DATE, // YYYY-MM-DD HH:MM:SS 交卷时间
        unique: false
    },
    score: {
        type: db.INTEGER, // 98 分数
     	unique: false   
    },
    cost_time: {
        type: db.INTEGER, // 1800 考试用时， 单位是秒
        unique: false
    }
})