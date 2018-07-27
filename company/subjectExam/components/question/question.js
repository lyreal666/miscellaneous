/*
 * @Author: ytj 
 * @Date: 2018-07-13 16:11:10 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-26 15:02:59
 */
let app = getApp();

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
            type: Number,
            value: 0
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
        QC: 1500,
        imageSrc: ''
    },
    methods: {
        initData() {
            const QC = app.globalData.currentSubject === '科目一' ? app.globalData.subject1QC : app.globalData.subject4QC
            const imgNum = String(this.properties.num).padStart(4, '0');
            let imageSrc;
            console.log(this.properties.hasPic);
            if (this.properties.hasPic === 0) {
                this.setData({
                    QC
                })
                return;
            } else if (this.properties.hasPic ==1 ) {
                console.log(`我是第${this.properties.num}道题`);
                imageSrc = `http://127.0.0.1:8848/questionResource/${imgNum}.jpg`
            } else {
                imageSrc = `http://127.0.0.1:8848/questionResource/${imgNum}.mp4`
            }
            this.setData({
                QC,
                imageSrc
            })
        }
    },
    attached() {
        this.initData();
    },
})