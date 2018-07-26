/*
 * @Author: ytj 
 * @Date: 2018-07-12 09:12:47 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-25 17:37:16
 */

let app = getApp();

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
        loadedQuestions: []
    },
    handleToggleTab(event) {
        const index = event.detail.index;
        // 0 represent collection, 1 represent studyMode, 2 represent float panel
        if (index === 0) {

        } else if (index === 1) {
            let question = this.data.loadedQuestions.find((element, index) => index + 1 === this.data.currentItem);
            console.log(typeof question);
            question.showDetail = !question.showDetail;
            question.showAnswer = true;
            this.setData({
                loadedQuestions: this.data.loadedQuestions,
            })
        } else if (index === 2) {
            this.setData({
                isPullUp: !this.data.isPullUp
            });
        }
    },
    handleSwiperChange(event) {
        this.setData({
            currentItem: event.detail.current + 1
        })
    },
    initData() {
        wx.request({
            url: 'http://127.0.0.1:8848/api/questions/1/100', //仅为示例，并非真实的接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (result) => {
                let downloadQuestions = result.data.data;
                downloadQuestions.forEach(element => {
                    if (element.type === 0) {
                        element.type = '单选题';
                    } else if (element.type === 1) {
                        element.type = '判断题';
                    } else {
                        element.type = '多选题';
                    }
                    
                    element.options = JSON.parse(element.options);
                    element.subject = element.subject === 1 ? '科目一' : '科目四';
                    element.showAnswer = false;
                    element.showDetail = false;
                });

                // loadedQuestions = [
                //     {
                //         num: 2,
                //         type: '判断题',
                //         answer: 'B',
                //         hasPic: 'false',
                //         title: "对违法驾驶发生重大交通事故且构成犯罪的，不追究其刑事责任。",
                //         options: [
                //             "正确",
                //             "错误",
                //             "",
                //             ""
                //         ],
                //         detail: "《道路交通安全法》第一百零一条：违反道路交通安全法律、法规的规定，发生重大交通事故，构成犯罪的，依法追究刑事责任，并由公安机关交通管理部门吊销机动车驾驶证。",
                //     }
                // ];
                this.setData({
                    downloadQuestions,
                    loadedQuestions: downloadQuestions.slice(28, 40)
                })
            }
        })
    },
    onLoad() {
        this.initData();
    }
})