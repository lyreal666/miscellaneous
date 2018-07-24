# 科目考试项目相关表设计

### 有以下表

1. `questions ` 记录所有题目的题库表
2. `questions_versions` 建立题目版本到题库的映射关系
3. `exams` 保存每一个用户每一次的模拟考试记录
4. `users` 保存每一个用户的账号信息

### questions

```javascript
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
    has_pic: db.INTEGER, // 0: none, 1: has pic, 2: has video
    title: db.TEXT,
    options: db.TEXT,
    detail: db.TEXT,
    faile_times: db.INTEGER // 999
})	
```

### questions_versions

```javascript
module.exports = db.defineModel('questions_versions', {
    version_name: {
        type: db.STRING(40), // 'v1.0'
        unique: true
    },
    map2questions: {
        type: db.JSON, // '[601, 602, ..., 3600]'
        unique: true
    }
})
```



### users

```javascript
module.exports = db.defineModel('users', {
    name: {
        type: db.STRING(80),
        unique: false
    },
    wx: {
        type: db.STRING(80),
        unique: true
    },
    collections: {
        type:db.JSON, // '[666, 888, 999]'s
        unique: false
    },
    subject1failed: {
        type: db.JSON,
        unique: false
    },
    subject4failed: {
        type: db.JSON,
        unique: false
    },
    subject1right: {
        type: db.JSON,
        unique: false
    },
    subject4right: {
        type: db.JSON,
        unique: false
    }
})
```

### exams

```javascript
module.exports = db.define('exams', {
    wx: {
        type: db.STRING(80),
        unique: true
    },
    subject: {
     	type: db.INTEGER, // 1/4 
        unique: false
    },
    handed_time: {
        type: db.DATE, // YYYY-MM-DD HH:MM:SS
        unique: false
    },
    score: {
        type: db.INTEGER, // 98
     	unique: false   
    },
    cost_time: {
        type: db.INTEGER, // 10 * 60s => 10分钟
        unique: false
    }
})
```

