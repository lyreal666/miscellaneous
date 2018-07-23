const db = require('../utils/db');


module.exports = db.defineModel('questions', {
    number: {
        type: db.INTEGER,
        unique: true
    },
    subject: db.STRING(12),
    car_types: db.STRING(80),
    chapter: db.STRING(80),
    type: db.STRING(12),
    answer: db.STRING(8),
    hasPic: db.INTEGER,
    title: db.STRING(600),
    options: db.TEXT,
    detail: db.TEXT
})