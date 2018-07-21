const db = require('../utils/db');


module.exports = db.defineModel('questions', {
    number: {
        type: db.INTEGER,
        unique: true
    },
    subject: db.STRING(12),
    car_types: db.STRING(20),
    chapter: db.STRING(80),
    type: db.STRING(12),
    answer: db.STRING(8),
    hasPic: db.INTEGER,
    title: db.STRING(120),
    options: db.STRING(120),
    detail: db.STRING(300)
})