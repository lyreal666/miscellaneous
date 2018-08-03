let app = getApp();
let globalData = app.globalData;
let subjectData = globalData.currentSubject === 1 ? globalData.subject1data : globalData.subject4data; 

Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        type: {
            type: Number,
            value: 0
        },
        options: {
            type: Array,
            value: ["过失行为", "违规行为", "违章行为", "违法行为"]
        },
        rightAnswer: {
            type: String,
            value: 'A'
        },
        showAnswer: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal, changedPath) {
                this.data.computedOptions.forEach(element => {
                    if (this.data.rightAnswer.includes(element.letter)) {
                        element.classList = 'right-option';
                        element.letter = '√'
                    }
                })
                this.setData({
                    computedOptions: this.data.computedOptions
                })
                this.data.completed = true;
            }
        }
    },
    data: {
        computedOptions: [],
        selectedOptions: {},
        completed: false,
        disabled: false
    },
    methods: {
        initData() {
            this.data.selectedOptions = new Set();

            // compute options
            let computedOptions = this.properties.options.map((element, index) => {
                let ACode = 'A'.charCodeAt(0);
                return {
                    letter: String.fromCharCode(ACode + index),
                    ifExist: this.data.type === '多选题' ? true : element.trim() !== '',
                    content: element
                }
            });

            // add option.classList
            computedOptions = computedOptions.map(element => {
                return {
                    ...element,
                    classList: ''
                }
            })

            // 恢复上次退出时的状态
            if (subjectData.subject === '1') {
                for (let item of subjectData.rightQuestions) {
                    if (this.data.num === item.number) {
                        const flag = item.selection;
                        let rightOption = computedOptions.find(element => element.letter === flag);
                        rightOption.classList = 'right-option';
                        rightOption.letter = '√';
                    }
                }

                for (let item of subjectData.failedQuestions) {
                    if (this.data.num === item.number) {
                        const flag = item.selection;
                        computedOptions.forEach(element => {
                            if (element.letter === flag) {
                                element.classList = 'selected-wrong-option';
                                element.flag = 'x'
                            } else if (this.data.rightAnswer.includes(element.letter)) {
                                element.classList = 'right-option';
                                element.letter = '√'
                            }
                        })
                    }
                }
            } else {
                if (this.data.type !== 2) {
                    for (let item of subjectData.rightQuestions) {
                        if (this.data.num === item.number) {
                            const flag = item.selection;
                            let rightOption = computedOptions.find(element => element.letter === flag);
                            rightOption.classList = 'right-option';
                            rightOption.letter = '√';
                        }
                    }

                    for (let item of subjectData.failedQuestions) {
                        if (this.data.num === item.number) {
                            const flag = item.selection;
                            computedOptions.forEach(element => {
                                if (element.letter === flag) {
                                    element.classList = 'selected-wrong-option';
                                    element.flag = 'x'
                                } else if (this.data.rightAnswer.includes(element.letter)) {
                                    element.classList = 'right-option';
                                    element.letter = '√'
                                }
                            })
                        }
                    }
                } else {
                    for (let item of subjectData.rightQuestions) {
                        if (this.data.num === item.number) {
                            computedOptions.forEach(option => {
                                if (item.selection.includes(option.letter)) {
                                    option.classList = 'm-right-option'
                                    option.letter = '√';
                                }
                            })
                        }
                    }

                    for (let item of subjectData.failedQuestions) {
                        if (this.data.num === item.number) {
                            computedOptions.forEach(option => {
                                if (this.data.rightAnswer.includes(option.letter)) {
                                    option.classList = 'm-right-option'
                                    option.letter = '√';
                                } else if (item.selection.includes(option.letter)) {
                                    option.classList = "m-wrong-option";
                                    option.letter = 'x';
                                }
                            })
                        }
                    }

                }
            }
            this.setData({
                computedOptions
            })
        },
        handleSingleOptionClick(event) {
            let flag = event.currentTarget.dataset.optionFlag;
            if (!this.data.completed) {
                const openID = globalData.openID;
                const subject = subjectData.subject;
                let answerStatus;
                let selection = flag;
                if (!this.data.rightAnswer.includes(flag)) {
                    answerStatus = false;
                    subjectData.failedQuestions.push({
                        number: this.properties.num,
                        selection
                    })

                    this.data.computedOptions.forEach(element => {
                        if (element.letter === flag) {
                            element.classList = 'selected-wrong-option';
                            element.flag = 'x'
                        } else if (this.data.rightAnswer.includes(element.letter)) {
                            element.classList = 'right-option';
                            element.letter = '√'
                        }
                    })
                } else {
                    subjectData.rightQuestions.push({
                        number: this.properties.num,
                        selection
                    })

                    answerStatus = true;
                    let rightOption = this.data.computedOptions.find(element => element.letter === flag);
                    rightOption.classList = 'right-option';
                    rightOption.letter = '√'
                }
                wx.request({
                    url: 'http://127.0.0.1:8848/api/user/submitOrderPractice',
                    method: 'POST',
                    data: {
                        number: this.properties.num,
                        openID,
                        subject,
                        answerStatus,
                        selection
                    },
                    success: (result) => {}
                });
            }
            this.setData({
                computedOptions: this.data.computedOptions
            })

            this.data.completed = true;
            this.triggerEvent('singleOptionClick', {}, {
                bubbles: false
            })
        },
        handleMultipleOptionClick(event) {
            if (!this.data.completed) {
                let flag = event.currentTarget.dataset.optionFlag;

                let selectOption = this.data.computedOptions.find(element => element.letter === flag);
                if (selectOption.classList.trim() === '') {
                    selectOption.classList = 'selected';
                    this.data.selectedOptions.add(flag);
                } else {
                    selectOption.classList = ''
                    this.selectedOptions.delete(flag)
                }
            }
            this.setData({
                computedOptions: this.data.computedOptions,
            });

            this.triggerEvent('multipleOptionClick', {}, {
                bubbles: false
            })
        },
        handleSubmit() {
            let selectedOptions = this.data.selectedOptions;
            if ([...selectedOptions].length < 2) {
                wx.showToast({
                    title: '多选题至少两项',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                // 多选题只有科目四有
                const selection = [...this.data.selectedOptions].sort().join('');

                let answerStatus = selection === this.data.rightAnswer;
                this.data.computedOptions.forEach(element => {
                    if (this.data.rightAnswer.includes(element.letter)) {
                        element.classList = 'm-right-option'
                        element.letter = '√';
                    } else if (this.data.selectedOptions.has(element.letter)) {
                        element.classList = "m-wrong-option";
                        element.letter = 'x';
                    }
                })

                if (answerStatus) {
                    subjectData.rightQuestions.push({
                        number: this.data.num,
                        selection
                    })
                } else {
                    subjectData.failedQuestions.push({
                        number: this.data.num,
                        selection
                    })
                }
                this.data.completed = true;
                this.setData({
                    computedOptions: this.data.computedOptions,
                    disabled: true
                });

                wx.request({
                    url: 'http://127.0.0.1:8848/api/user/submitOrderPractice',
                    method: 'POST',
                    data: {
                        number: this.properties.num,
                        openID: globalData.openID,
                        subject: subjectData.subject,
                        answerStatus,
                        selection
                    },
                    success: (result) => {
                        console.log(result);
                    }
                })

                // magic don't touch
                this.triggerEvent('singleOptionClick', {}, {
                    bubbles: false
                })
            }
        }
    },
    attached() {
        this.initData();
    },
    ready() {
        // console.log(this.data.computedOptions);
    }
});