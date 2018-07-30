/*
 * @Author: ytj 
 * @Date: 2018-07-13 07:53:26 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-28 09:38:49
 */

Page({
    data: {
        orderIcons: [{
                imgSrc: '/common/imgs/chapterPractice.png',
                iconText: '章节练习'
            },
            {
                imgSrc: '/common/imgs/wrongQues.png',
                iconText: '错题汇总'
            },
            {
                imgSrc: '/common/imgs/randPractice.png',
                iconText: '随机练习'
            },
        ],
        simulationIcons: [{
                imgSrc: '/common/imgs/testTricks.png',
                iconText: '考试技巧'
            },
            {
                imgSrc: '/common/imgs/testFighting.png',
                iconText: '难题攻略'
            },
            {
                imgSrc: '/common/imgs/testRecording.png',
                iconText: '考试记录'
            },
        ],
        scale1: '135/1315',
        info1: '错误数: 32',
        scale2: '最高分: 84',
        info2: '平时用时: 15',
        selectedSubject: '科目一'
    },
    handleClickIcon(event) {
        if (event.detail === "章节练习") {
            wx.navigateTo({
                url: '/pages/chapterList/chapterList'
            })
        } else if (event.detail === '考试记录') {
            wx.navigateTo({
                url: '/pages/testRecording/testRecording'
            })
        }
    },
    selectSubject(event) {
        if (this.data.selectedSubject !== event.currentTarget.dataset.subjectText) {
            const nowSubject = this.data.selectedSubject === '科目一' ? '科目二' : '科目四';
            this.setData({
                selectedSubject: nowSubject
            })
            globalData.currentSubject = nowSubject;
        }
    },
    toOrderPractice() {
        wx.navigateTo({
            url: '/pages/answer/answer'
        })
    },
    toMockExam() {
        wx.navigateTo({
            url: '/pages/mockExam/mockExam'
        })
    },
    drawGauge(id1, id2) {
        // 画大环
        let ctx1 = wx.createCanvasContext(id1)
        ctx1.setLineWidth(10); // 设置圆环的宽度
        ctx1.setStrokeStyle('#3872b1'); // 设置圆环的颜色
        ctx1.setLineCap('square') // 设置圆环端点的形状
        ctx1.beginPath(); //开始一个新的路径
        ctx1.arc(75, 75, 64, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        ctx1.stroke(); //对当前路径进行描边
        ctx1.arc(75, 75, 64, 0, (45 / 360) * 2 * Math.PI, false);
        ctx1.stroke();
        ctx1.draw();

        // 画小环
        let ctx2 = wx.createCanvasContext(id2)
        ctx2.setLineWidth(3);
        ctx2.setStrokeStyle('white');
        ctx2.setLineCap('square');
        ctx2.beginPath();
        ctx2.arc(75, 75, 64, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        ctx2.stroke();
        ctx2.arc(75, 75, 64, 0, (45 / 360) * 1.5 * Math.PI, false);
        ctx2.stroke();
        ctx2.draw();
    },
    onShow: function () {
        this.drawGauge('canvasProgressBg1', 'canvasProgress1');
        this.drawGauge('canvasProgressBg2', 'canvasProgress2');
    }
})