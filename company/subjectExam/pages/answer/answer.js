/*
 * @Author: ytj
 * @Date: 2018-07-12 09:12:47
 * @Last Modified by: ytj
 * @Last Modified time: 2018-08-03 23:03:58
 */

/**
 * FIXME: 考虑给questions表加一个index字段，
 */
let app = getApp();
let globalData = app.globalData;
let subjectData = globalData.currentSubject === 1 ? globalData.subject1data : globalData.subject4data; 

Page({
    data: {
        tabs: [{
                imgSrc: '/common/imgs/collection.png'
            },
            {
                imgSrc: '/common/imgs/studyMode.png'
            },
            {
                imgSrc: '/common/imgs/questionSelect.png'
            }
        ],
        showDetail: false,
        showAnswer: false,
        currentItem: 1,
        isPullUp: false,
        downloadQuestions: [],
        downloadQuestions: [],
        rightCount: 0,
        failedCount: 0,
        resetQuestion: true
    },
    dealQuestions(downloadQuestions) {
        downloadQuestions.forEach(question => {
            question.options = JSON.parse(question.options);
            question.showAnswer = false;
            question.showDetail = false;
        });
    },
    setAnswerCount() {
        console.log('subjectData.rightQuestions:', subjectData.rightQuestions);
        this.setData({
            rightCount: subjectData.rightQuestions.length,
            failedCount: subjectData.failedQuestions.length
        })
    },
    handleToggleTab(event) {
        const index = event.detail.index;
        // 0 represent collection, 1 represent studyMode, 2 represent float panel
        if (index === 0) {
            wx.request({
                url: 'http://127.0.0.1:8848/api/user/collection',
                data: {
                    openID: globalData.openID,
                    number: this.data.currentItem
                },
                method: 'POST',
                success: (result) => {}
            })
        } else if (index === 1) {
            let question = this.data.downloadQuestions.find((element, index) => index + 1 === this.data.currentItem);
            question.showDetail = !question.showDetail;
            question.showAnswer = true;
            this.setData({
                downloadQuestions: this.data.downloadQuestions,
            })
        } else if (index === 2) {
            this.setData({
                isPullUp: !this.data.isPullUp
            });
        }
    },
    handleSingleOptionClick() {
        this.setAnswerCount();
    },
    handleSelectOption(event) {
        const currentNumber = event.detail;
        const questionNumbers = new Set(this.data.downloadQuestions.map(qs => qs.number));
        if (!questionNumbers.has(currentNumber)) {
            const startIndex = Math.trunc(currentNumber / 10) * 10;
            const endIndex = startIndex + 20;
            wx.request({
                url: `http://127.0.0.1:8848/api/questions/${startIndex}/${endIndex}`, //仅为示例，并非真实的接口地址
                method: 'GET',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: (result) => {
                    let downloadQuestions = result.data.data;
                    this.dealQuestions(downloadQuestions);
                    downloadQuestions = [...this.data.downloadQuestions, ...downloadQuestions];
                    const index = downloadQuestions.findIndex(element => element.number === currentNumber)
                    this.setData({
                        downloadQuestions,
                        currentItem: index + 1
                    })
                }
            })
        } else {
            const index = this.data.downloadQuestions.findIndex(element => element.number === currentNumber);
            this.setData({
                currentItem: index + 1
            })
        }
    },
    handleSwiperChange(event) {
        const current = event.detail.current;
        let downloadQuestions = this.data.downloadQuestions;
        if (current === downloadQuestions.length - 1) {
            setTimeout(() => {
                const lastQuestionNumber = downloadQuestions[downloadQuestions.length - 1].number;
                wx.request({
                    url: `http://127.0.0.1:8848/api/questions/range`, //仅为示例，并非真实的接口地址
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        subject: subjectData.subject,
                        start: downloadQuestions.length,
                        end: 1
                    },
                    success: (result) => {
                        let downloadQuestions = result.data.data;
                        this.dealQuestions(downloadQuestions);
                        this.setData({
                            downloadQuestions: [...this.data.downloadQuestions, ...downloadQuestions],
                            currentItem: current + 1
                        })
                    }
                })
            }, 1000)

        } else if (current === 0) {
            const startIndex = Math.max(Math.trunc(latestQuestion / 10) * 10, 0);
            const endIndex = downloadQuestions[0].
            setTimeout(() => {
                wx.request({
                    url: 'http://127.0.0.1:8848/api/questions/range',
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    data: {
                        subject: subjectData.subject,
                        start: 1,
                        end: 20
                    },
                    success: (result) => {
                        let downloadQuestions = result.data.data;
                        console.log('initData downloadQuestions:', downloadQuestions);
                        this.dealQuestions(downloadQuestions);
                        this.setData({
                            downloadQuestions,
                            currentItem: 1
                        })
                    }
                })
            }, 1000)
        } else {
            this.setData({
                currentItem: current + 1
            })
        }
    },
    initData() {
        this.setAnswerCount();
        const latestQuestion = subjectData.latestDoneQuestion || 1;
        const startIndex = Math.max(Math.trunc(latestQuestion / 10) * 10, 0);
        const endIndex = startIndex + 20;
        wx.request({
            url: 'http://127.0.0.1:8848/api/questions/range',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                subject: subjectData.subject,
                start: startIndex,
                end: endIndex
            },
            success: (result) => {
                let downloadQuestions = result.data.data;
                console.log('initData downloadQuestions:', downloadQuestions);
                this.dealQuestions(downloadQuestions);
                this.setData({
                    downloadQuestions,
                    currentItem: latestQuestion
                })
            }
        })
    },
    onLoad() {
        if (globalData.afterDelRec) {
            globalData.afterDelRec = false;
        }

        this.initData();
    },
    onUnload() {
        if (!globalData.afterDelRec) {
            wx.request({
                url: 'http://127.0.0.1:8848/api/user/latestQuestion', //仅为示例，并非真实的接口地址
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    subject: subjectData.subject,
                    latestQuestion: this.data.currentItem
                },
                success: (result) => {
                    console.log(this.data.currentItem);
                }
            })

            subjectData.latestDoneQuestion = this.data.currentItem;
        }
    }
})