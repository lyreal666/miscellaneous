/*
 * @Author: ytj 
 * @Date: 2018-07-12 09:12:47 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-18 15:12:08
 */
 
let app = getApp();

Page({
    data: {
        tabs: [
            {imgSrc: '/common/imgs/collection.png'},
            {imgSrc: '/common/imgs/studyMode.png'},
            {imgSrc: '/common/imgs/questionSelect.png'}
        ],
        showDetail: false,
        questionCompleted: false,
        currentItem: 0,
        isPullUp: false
    },
    properties: {
        questions: [],
    } ,
    handleToggletab(event) {
        const index = event.detail.index;
        // 0 represent collection, 1 represent studyMode, 2 represent float panel
        if (index === 0) {

        } else if (index === 1) {
            let question = this.data.questions.find(element => element.num === this.data.currentItem);
            question.showDetail  = !question.showDetail;
            this.setData({
                questions: this.data.questions,
            })
        } else if (index === 2) {
            this.setData({
                isPullUp: !this.data.isPullUp
            });
        }
    },
    handleSwiperChange(event) {
        this.setData({
            currentItem: event.detail.current
        })
    },
    onLoad() {
        let questions = [
            {
                num: 0,
                type: '单选题',
                answer: 'A',
                hasPic: true,
                title: "机动车驾驶人违法驾驶造成重大交通事故构成犯罪的，依法追究什么责任？",
                options: [
                    "刑事责任",
                    "民事责任",
                    "经济责任",
                    "直接责任"
                ],
                detail: "《道路交通安全法》第一百零一条：违反道路交通安全法律、法规的规定，发生重大交通事故，构成犯罪的，依法追究刑事责任，并由公安机关交通管理部门吊销机动车驾驶证。",
                showDetail: false
            },
            {
                num: 1,
                type: '判断题',
                answer: 'B',
                hasPic: 'false',
                title: "对违法驾驶发生重大交通事故且构成犯罪的，不追究其刑事责任。",
                options: [
                    "正确",
                    "错误",
                    "",
                    ""
                ],
                detail: "《道路交通安全法》第一百零一条：违反道路交通安全法律、法规的规定，发生重大交通事故，构成犯罪的，依法追究刑事责任，并由公安机关交通管理部门吊销机动车驾驶证。",
                showDetail: false
            },
            {
                num: 2,
                type: '单选题',
                answer: 'B',
                hasPic: 'true',
                title: "驾驶机动车应当随身携带哪种证件？",
                options: [
                    "工作证",
                    "驾驶证",
                    "身份证",
                    "职业资格证"
                ],
                detail: "《道路交通安全法》第十一条：驾驶机动车上道路行驶，应当悬挂机动车号牌，放置检验合格标志、保险标志，并随车携带机动车行驶证。",
                showDetail: false
            },
        ]
        
        this. setData({
            questions: questions
        })   
    }
})