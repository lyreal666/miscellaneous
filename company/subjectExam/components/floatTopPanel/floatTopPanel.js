let app = getApp();
let globalData = app.globalData;
let subjectData = globalData.currentSubject === 1 ? globalData.subject1data : globalData.subject4data; 

Component({
    properties: {
        questionsCount: {
            type: Number,
            value: 1330
        },
        isPanelUp: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal, changedPath) {
                this.setData({
                    isPullUp: !this.data.isPullUp
                })
            }
        },
        rightCount: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal, changedPath) {
                this.setOptions();
            }
        },
        failedCount: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal, changedPath) {
                this.setOptions();
            }
        }
    },
    data: {
        isPullUp: false,
        options: [{
            num: 1,
            status: 0
        }]
    },
    methods: {
        setOptions() {
            let rightIndexes;
            let failedIndexes;
            let options = Array
                .from({
                    length: subjectData.subjectQC
                })
                .map((option, index) => {
                    return {
                        num: index + 1,
                        status: 0
                    };
                });

            rightIndexes = new Set(subjectData.rightQuestions.map((ele, index) => index));
            failedIndexes = new Set(subjectData.failedQuestions.map((ele, index) => index));

            options.forEach((option, index) => {
                if (rightIndexes.has(index)) {
                    option.status = 1;
                } else if (failedIndexes.has(index)) {
                    option.status = 2;
                }
            })

            this.setData({
                options
            })
        },
        initData() {
            this.setOptions();
        },
        handleClickBg() {
            this.setData({
                isPullUp: false,
            });
        },
        handleClickOption(event) {
            this.setData({
                isPullUp: false,
            });
            this.triggerEvent('select', event.currentTarget.dataset.index, {
                bubbles: false
            })
        },
        handleDeleteRecording() {
            wx.request({
                url: 'http://127.0.0.1:8848/api/user/questionDelete',
                method: 'POST',
                data: {
                    openID: globalData.openID,
                    subject: subjectData.subject,
                    operation: 'delete question recording',
                }
            });

            subjectData.rightQuestions = [];
            subjectData.failedQuestions = [];
            subjectData.latestDoneQuestion = 1;

            globalData.afterDelRec = true;
            wx.redirectTo({
                url: '/pages/answer/answer'
            })

        },
    },
    attached() {
        this.initData();
    },
    ready() {}
})