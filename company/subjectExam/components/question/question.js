/*
 * @Author: ytj 
 * @Date: 2018-07-13 16:11:10 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-13 17:57:00
 */

// "number": "1",
// "subject": "科目一",
// "car_types": "小车客车货车",
// "chapter": "道路交通安全法律，法规和规章。",
// "type": "单选题",
// "answer": "B",
// "hasPic": "0",
// "title": "驾驶机动车在道路上违反道路交通安全法的行为，属于什么行为？",
// "options": [
//     "过失行为",
//     "违规行为",
//     "违章行为",
//     "违法行为"
// ],
// "detail": "违反《道路交通安全法》，属于违法行为。官方已无违规、违章的说法。"
Component({
    properties: {
        num: {
            type: Number,
            value: 9999
        },
        type: {
            type: String,
            value: 'question type'
        },
        answer: {
            type: String,
            value: 'A'
        },
        hasPic: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: 'question title'
        },
        options: {
            type: Array,
            value: ['optionA', 'optionB', 'optionC', 'optionD']
        },
        detail: {
            type: String,
            value: 'the detail of the question...'
        }
    },
    data: {
        showOptions: false
    },
    methods: {

    }
})