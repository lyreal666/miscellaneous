/*
 * @Author: ytj 
 * @Date: 2018-07-13 16:11:10 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-08-01 11:52:14
 */
let app = getApp();

Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        index: {
            type: Number,
            value: 0,
        },
        type: {
            type: Number,
            value: 0
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
        imageSrc: '',
        questionType: '单选题'
    },
    methods: {
        initData() {
            const QC = app.globalData.currentSubject === '科目一' ? app.globalData.subject1QC : app.globalData.subject4QC
            console.log(QC);
            const imgNum = String(this.properties.num).padStart(4, '0');
            let imageSrc;
            if (this.properties.hasPic === 0) {
                this.setData({
                    QC,
                    questionType: this.data.type === 0 ? '单选题' : this.data.type === 1 ? '判断题' : '多选题'
                })
                return;
            } else if (this.properties.hasPic == 1) {
                imageSrc = `http://127.0.0.1:8848/questionResource/${imgNum}.jpg`
            } else {
                imageSrc = `http://127.0.0.1:8848/questionResource/${imgNum}.mp4`
            }
            this.setData({
                QC,
                imageSrc,
                questionType: this.data.type === 0 ? '单选题' : this.data.type === 1 ? '判断题' : '多选题'
            })
        },
        handleSingleOptionClick() {
            this.triggerEvent('singleOptionClick', {}, {
                bubbles: false
            })
        }
    },
    attached() {
        this.initData();
    },
})