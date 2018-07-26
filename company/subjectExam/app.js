//app.js
App({
    globalMethods: {

    },
    globalData: {},
    onLaunch: function (options) {
        // 获取题库中题目总数
        wx.request({
            url: 'http://127.0.0.1:8848/api/questions/count/0',
            method: 'GET',
            header: {
                'content-type': 'application/json',
            },
            success: (result) => {
                this.globalData.subject1QC = result.data.data.count;
            }
        });

        wx.request({
            url: 'http://127.0.0.1:8848/api/questions/count/1',
            method: 'GET',
            header: {
                'content-type': 'application/json',
            },
            success: (result) => {
                this.globalData.subject4QC = result.data.data.count;
            }
        })

        this.globalData.currentSubject = '科目一';
    },
    onShow: function (options) {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {
        console.log(msg)
    },
})