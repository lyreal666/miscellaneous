/*
 * @Author: ytj 
 * @Date: 2018-07-13 16:11:10 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-19 11:57:22
 */

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
        },
        showDetail: {
            type: Boolean,
            value: false
        },
        showAnswer: {
            type: Boolean,
            value: false
        }
    },
    data: {
        showOptions: false,
    },
    methods: {
    },
    attached() {
    },
})