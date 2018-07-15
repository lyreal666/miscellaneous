Component({
    properties: {
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
        }
    },
    data: {
        computedOptions: [],
        selected: [],
        showAnswer: false,
        completed: false,
    },
    methods: {
        initData() {
            // compute options
            let computedOptions = this.properties.options.map((element, index) => {
                let ACode = 'A'.charCodeAt(0);
                return {
                    letter: String.fromCharCode(ACode + index),
                    ifExist: element.trim() !== '',
                    content: element
                }
            });

            // add option.isRight to option
            ['A', 'B', 'C', 'D'].forEach((element, index) => {
                computedOptions[index].isRight = this.properties.rightAnswer.includes(element) ? true : false;
            })

            // add option.classList
            computedOptions = computedOptions.map(element => {
                return {
                    ...element,
                    classList: element.isRight ? 'right-answer' : 'wrong-answer'
                }
            })

            this.setData({
                computedOptions
            })
        },
        handleOptionClick(event) {
            if (!this.data.showAnswer) {
                let flag = event.currentTarget.dataset.optionFlag;
                if (! this.data.rightAnswer.includes(flag)) {
                    let selectedOption = this.data.computedOptions.find(element => element.letter === flag);
                        selectedOption.classList = `${selectedOption.classList} selected-wrong-option`.replace('wrong-answer', '')
                        this.setData({
                            computedOptions: this.data.computedOptions,
                        })
                }
            }
            this.setData({ showAnswer: this.data.showAnswer || true })
        }
    },
    attached() {
        this.initData();
    },
    ready() {
        // console.log(this.data.computedOptions);
    }
});