let app = getApp();

Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: '单选题'
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
            observer: function(newVal, oldVal, changedPath) {
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

            this.setData({
                computedOptions
            })
        },
        handleSingleOptionClick(event) {
            let flag = event.currentTarget.dataset.optionFlag;
            if (!this.data.completed) {
                if (!this.data.rightAnswer.includes(flag)) {
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
                    let rightOption = this.data.computedOptions.find(element => element.letter === flag);
                    rightOption.classList = 'right-option';
                    rightOption.letter = '√'
                }
            }
            this.setData({
                computedOptions: this.data.computedOptions
            })
            this.data.completed = true;
        },
        handleMultipleOptionClick(event) {
            if (!this.data.completed) {
                console.log(this.data.selectedOptions);
                let flag = event.currentTarget.dataset.optionFlag;

                let selectOption =  this.data.computedOptions.find(element => element.letter === flag);
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
                this.data.computedOptions.forEach(element => {
                    if (this.data.rightAnswer.includes(element.letter)) {
                        element.classList = 'm-right-option'
                        element.letter = '√';
                    } else if (this.data.selectedOptions.has(element.letter)) {
                        element.classList = "m-wrong-option";
                        element.letter = 'x';
                    }
                })
                this.data.completed = true;
                this.setData({
                    computedOptions: this.data.computedOptions,
                    disabled: true
                });
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