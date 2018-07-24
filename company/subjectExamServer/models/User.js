const db = require('../utils/db');


module.exports = db.defineModel('questions', {
    name: {
        type: db.STRING(80),
        unique: false
    },
    wx: {
        type: db.STRING(40),
        unique: true
    },
    
})