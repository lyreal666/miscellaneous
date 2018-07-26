const db = require('../utils/db');


module.exports = db.defineModel('questions', {
    number: {
        type: db.INTEGER, // 题号
        unique: true
    },
    subject: db.INTEGER, // 1/4 科目1或科目4
    car_types: db.STRING(80), // 车子类型
    chapter: db.STRING(80), // 章节
    type: db.INTEGER, // 0/单选, 1/判断题/, 2/多选题
    answer: db.STRING(8), // 'ABC'
    has_pic: db.INTEGER, // 0: none, 1: has pic, 2: has video
    title: db.TEXT, // 标题
    options: db.JSON, // 选项
    detail: db.TEXT, // 答案
    failed_times: db.INTEGER // 999 所有用户总共做错次数
})	