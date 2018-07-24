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
    options: db.TEXT, // 选项
    detail: db.TEXT, // 答案
    faile_times: db.INTEGER // 999 所有用户总共做错次数
})	
```

### questions_versions

```javascript
module.exports = db.defineModel('questions_versions', {
    version_name: {
        type: db.STRING(40), // 'v1.0' 版本名
        unique: true
    },
    map2questions: {
        type: db.JSON, // '[601, 602, ..., 3600]' 映射的3000道题
        unique: true
    }
})
```



### users

```javascript
module.exports = db.defineModel('users', {
    name: {
        type: db.STRING(80), // '好名字被...'
        unique: false
    },
    wx: {
        type: db.STRING(80), // wxnumber123456 微信号
        unique: true
    },
    collections: {
        type:db.JSON, // '[666, 888, 999]' 收藏了第666, 888, 999题
        unique: false
    },
    subject1right: {
        type: db.JSON, // '[1, 3, 7]' 科目一对了1, 3, 7题
        unique: false
    },
    subject1failed: {
        type: db.JSON, // '[2, 4, 6]' 科目一错了2, 4, 6题
        unique: false
    },
    subject4right: {
        type: db.JSON, // 和楼上一样
        unique: false
    }
    subject4failed: {
        type: db.JSON,
        unique: false
    } 
})
```

### exams

```javascript
module.exports = db.define('exams', {
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
```

