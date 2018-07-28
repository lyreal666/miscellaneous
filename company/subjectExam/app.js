//app.js
App({
    globalMethods: {

    },
    globalData: {},
    fetchUserInfo() {
        // 登录
        wx.login({
            success: res => {
                wx.request({
                    url: 'http://127.0.0.1:8848/login',
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: (res) => {
                        const data = res.data;
                        if (data.msg) {
                            this.globalData.openID = data.openID
                        }
                    },
                    fail(error) {
                        console.log(error);
                    }
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    onLaunch: function (options) {
        this.fetchUserInfo();
        // 获取题库中题目总数
        console.log('globalData:', this.globalData);
        wx.request({
            url: 'http://127.0.0.1:8848/api/user/launch',
            method: 'POST',
            data: {
                openID: this.globalData.openID
            },
            header: {
                'content-type': 'application/json',
            },
            success: (result) => {
                const data = result.data.data;
                console.log('#resultData:', data);
                this.globalData.subject1QC = data.subject1count;
                this.globalData.subject4QC = data.subject4count;
                if (!data.isNewUser) {
                    this.globalData.collections = data.userInfo.collections;
                    this.globalData.subject1right = data.userInfo.subject1right;
                    this.globalData.subject1failed = data.userInfo.subject1failed;
                    this.globalData.subject4right = data.userInfo.subject1right;
                    this.globalData.subject4failed = data.userInfo.subject4failed;
                }
            }
        });
        this.globalData.currentSubject = '科目一';

        // 获取用户信息
        this.fetchUserInfo();

    },
    onShow: function (options) {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {},
})