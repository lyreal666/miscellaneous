let app = getApp();

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
        /**
         * TODO: 科目四下选题界面选项样式不生效
         */
        setOptions() {
            let rightNumbers;
            let failedNumbers;
            let globalData = app.globalData;
            if (globalData.currentSubject === '科目一') {
                rightNumbers = new Set(globalData.subject1right.map(element => element.number))
                failedNumbers = new Set(globalData.subject1failed.map(element => element.number))
            } else if (globalData.currentSubject === '科目四') {
                rightNumbers = new Set(globalData.subject4right.map(element => element.number))
                failedNumbers = new Set(globalData.subject4failed.map(element => element.number))
            }

            let options = Array.from({
                length: globalData.currentSubject === '科目一' ? globalData.subject1QC : globalData.subject4QC
            });
            options = options.map((element, index) => {
                let option = {
                    num: index + 1,
                    status: 0
                };
                if (rightNumbers.has(index + 1)) {
                    option.status = 1;
                } else if (failedNumbers.has(index + 1)) {
                    option.status = 2;
                }
                return option;
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
            let globalData = app.globalData;
            wx.request({
                url: 'http://127.0.0.1:8848/api/user/questionDelete',
                method: 'POST',
                data: {
                    openID: globalData.openID,
                    subject: globalData.currentSubject === '科目一' ? 1 : 4,
                    operation: 'delete question recording',
                }
            });

            if (globalData.currentSubject === '科目一') {
                globalData.subject1right = [];
                globalData.subject1failed = [];
                app.globalData.latestQuestion1 = 1;
            } else {
                globalData.subject4right = [];
                globalData.subject4failed = [];
                app.globalData.latestQuestion4 = 1;
            }

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