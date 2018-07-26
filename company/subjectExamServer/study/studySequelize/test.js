const Sequelize = require('sequelize');

let sequelize = new Sequelize('wxminitest', 'ytj', '5391848', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    }
});

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING(10),
        unique: true
    },
    age: {
        type: Sequelize.INTEGER,
        unique: true
    }
});
User.sync();

User.create({ name: 'ly', age: 21}, { field: ['name', 'age'] }).then();