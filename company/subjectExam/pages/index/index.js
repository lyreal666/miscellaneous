Page({
    data: {
        orderIcons: [
            { imgSrc: '/common/imgs/chapterPractice.png', iconText: '章节练习' },
            { imgSrc: '/common/imgs/wrongQues.png', iconText: '错题汇总' },
            { imgSrc: '/common/imgs/randPractice.png', iconText: '随机练习' },
        ],
        simulationIcons: [
            { imgSrc: '/common/imgs/testTricks.png', iconText: '考试技巧' },
            { imgSrc: '/common/imgs/testFighting.png', iconText: '考试攻略' },
            { imgSrc: '/common/imgs/testRecording.png', iconText: '考试记录' },
        ],
        scale1: '135/1315',
        info1: '错误数: 32',
        scale2: '最高分: 84',
        info2: '平时用时: 15',
        selectedSubject: '科目一'
    },
    selectSubject(event) {
        if (this.data.selectedSubject !== event.currentTarget.dataset.subjectText) {
            this.setData({
                selectedSubject: this.data.selectedSubject === '科目一' ? '科目二' : '科目一'
            })
        }
    },
    toOrderPractice() {
        wx.navigateTo({
            url: '/pages/answer/answer'
        })
    },
    drawProgressbg: function (id) {
        // 使用 wx.createContext 获取绘图上下文 context
        let ctx = wx.createCanvasContext(id)
        ctx.setLineWidth(10);// 设置圆环的宽度
        ctx.setStrokeStyle('#3872b1'); // 设置圆环的颜色
        ctx.setLineCap('square') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc(78, 78, 64, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        //设置一个原点(100,100)，半径为90的圆的路径到当前路径
        ctx.stroke();//对当前路径进行描边
        ctx.arc(78, 78, 64, 0, (45 / 360) * 2 * Math.PI, false);
        ctx.stroke();
        ctx.draw();
    },
    drawProgress(id) {
        let ctx = wx.createCanvasContext(id)
        ctx.setLineWidth(1);// 设置圆环的宽度
        ctx.setStrokeStyle('white'); // 设置圆环的颜色
        ctx.setLineCap('square') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc(78, 78, 66, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        ctx.stroke();//对当前路径进行描边
        ctx.arc(78, 78, 66, 0, (45 / 360) * 2 * Math.PI, false);
        ctx.stroke();
        ctx.draw();
    },
    onShow: function () {
        this.drawProgressbg('canvasProgressbg');
        this.drawProgress('canvasProgress');
        this.drawProgressbg('canvasProgressbg1');
        this.drawProgress('canvasProgress1');
    }
})
