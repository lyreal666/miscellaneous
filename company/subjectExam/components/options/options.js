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
        }
    },
    data: {
        computedOptions: [],
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
        handleOptionClick(event) {
            console.log('click');
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
        }
        
    },
    attached() {
        this.initData();
    },
    ready() {
        // console.log(this.data.computedOptions);
    }
});