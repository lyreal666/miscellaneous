Page({
    data: {
        scale: '135/1315',
        info: '错误数: 32'
    },
    drawProgressbg: function () {
        // 使用 wx.createContext 获取绘图上下文 context
        let ctx = wx.createCanvasContext('canvasProgressbg')
        ctx.setLineWidth(10);// 设置圆环的宽度
        ctx.setStrokeStyle('#3872b1'); // 设置圆环的颜色
        ctx.setLineCap('square') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc(75, 75, 64, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        //设置一个原点(100,100)，半径为90的圆的路径到当前路径
        ctx.stroke();//对当前路径进行描边
        ctx.arc(75, 75, 64, 0, (45 / 360) * 2 * Math.PI, false);
        ctx.stroke();
        ctx.draw();
    },
    drawProgress() {
        let ctx = wx.createCanvasContext('canvasProgress')
        ctx.setLineWidth(1);// 设置圆环的宽度
        ctx.setStrokeStyle('white'); // 设置圆环的颜色
        ctx.setLineCap('square') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc(75, 75, 66, (135 / 360) * 2 * Math.PI, 2 * Math.PI, false);
        ctx.stroke();//对当前路径进行描边
        ctx.arc(75, 75, 66, 0, (45 / 360) * 2 * Math.PI, false);
        ctx.stroke();
        ctx.draw();
    },
    onShow: function () {
        this.drawProgressbg();
        this.drawProgress()
    }
})