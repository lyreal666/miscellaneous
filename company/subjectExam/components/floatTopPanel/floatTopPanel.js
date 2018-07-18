Component({
    properties: {
        questionsCount: {
            type: Number,
            value: 1330
        },
        answerStatus: {
            type: Array,
            value: Array.from({ length: 1334 }, (element, index) => {
                return {
                    num: index + 1,
                    // 0 shows the question to be done, 1 shows answer right, 2 false show wrong
                    status: 2,
                }
            }),
        },
        isPanelUp: {
            type: Boolean,
            value: false,
            observer: function(newVal, oldVal, changedPath) {
                this.setData({
                    isPullUp: !this.data.isPullUp
                })
             }
        }
    },
    data: {
        rightCount: 7,
        wrongCount: 33,
        isPullUp: false
    },
    methods: {
        initData() {
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
            this.triggerEvent('select', event.currentTarget.dataset.index, {bubbles: false})
        }
    },
    
    attached() {
        // this.initData();
    },
    ready() {
    }
})