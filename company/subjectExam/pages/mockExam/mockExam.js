/*
 * @Author: ytj 
 * @Date: 2018-07-19 11:29:26 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-19 15:24:28
 */


Page({
    data: {
        question: [],
        tabs: [{
                imgSrc: '/common/imgs/handed.png'
            },
            {
                imgSrc: '/common/imgs/selectQuestion.png'
            }
        ],
        leftTimeStamp: 30 * 60,
        leftTimeStr: '30:00',
        isPullUp: false,
    },
    switchTab(event) {
        let operation = event.currentTarget.dataset.operation;
        if (operation === 'handed') {
            wx.showModal({
                title: '提示',
                content: '您还没有完成考试,确认要交卷吗?',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else if (operation === 'pullUpPanel') {
            this.setData({
                isPullUp: true
            })
        }
    },
    initData() {
        let questions = [{
                num: 0,
                type: '多选题',
                answer: 'ABD',
                hasPic: false,
                title: "林某驾车以110公里/小时的速度在城市道路行驶，与一辆机动车追尾后弃车逃离被群众拦下。经鉴定，事发时林某血液中的酒精浓度为135.8毫克/百毫升。林某的主要违法行为是什么？",
                options: [
                    "醉酒驾驶",
                    "超速驾驶",
                    "疲劳驾驶",
                    "肇事逃逸"
                ],
                detail: "违法行为有：一、“以110公里/小时的速度在城市道路行驶”属于超速驾驶；二、“与一辆机动车追尾后弃车逃离”属于肇事逃逸；三、“血液中的酒精浓度为135.8毫克/百毫升”是醉酒驾驶。",
                showDetail: false

            },
            {
                num: 1,
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
                num: 2,
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
                num: 3,
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

        this.setData({
            questions: questions
        })
    },
    onLoad() {
        this.initData();
        this.countDownInterval = setInterval(() => {
            let leftTimeStr = this.leftTimeStr;
            this.data.leftTimeStamp -= 1;
            leftTimeStr = `${ ~~(this.data.leftTimeStamp / 60) }:${ this.data.leftTimeStamp % 60}`
            this.setData({
                leftTimeStr
            })
        }, 1000)
    },
    onUnload() {
        clearInterval(this.countDownInterval)
    }
});