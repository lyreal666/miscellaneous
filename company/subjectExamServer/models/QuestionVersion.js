const db = require('../utils/db');

module.exports = db.defineModel('questions_versions', {
    version_name: {
        type: db.STRING(40), // 'v1.0' 版本名
        unique: true
    },
    map2questions: {
        type: db.JSON, // '[601, 602, ..., 3600]' 映射的3000道题
    }
})