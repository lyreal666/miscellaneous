//app.js
App({
    globalMethods: {

    },
    globalData: {},
    fetchUserInfo() {
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
                        if (data.success) {
                            this.openID = data.openID
                        }
                    },
                    fail(error) {
                    }
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo
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
                        this.globalData.openID = data.openID;
                        if (data.success) {
                            wx.request({
                                url: 'http://127.0.0.1:8848/api/user/launch',
                                method: 'POST',
                                data: {
                                    openID: data.openID
                                },
                                header: {
                                    'content-type': 'application/json',
                                },
                                success: (result) => {
                                    const data = result.data.data;
                                    console.log(data);
                                    const globalData = this.globalData;
                                    globalData.subject1QC = data.subject1count;
                                    globalData.subject4QC = data.subject4count;
                                    globalData.latestQuestion1 = data.userInfo.latest_question1 || 1;
                                    globalData.latestQuestion4 = data.userInfo.latest_question4 || 1;
                                    for (let attr of ['collections', 'subject1right', 'subject1failed', 'subject4right', 'subject4failed']) {
                                        if (!data.userInfo.isNewUser) {
                                            if (data.userInfo[attr] === '[]') {
                                                globalData[attr] = []
                                            } else {
                                                globalData[attr] = data.userInfo[attr]
                                            }
                                        } else {
                                            globalData[attr] = []
                                        }
                                    }

                                    globalData.subject1randomNumbers = Array
                                        .from({ length: data.subject1count })
                                        .map((element, index) => index + 1);

                                    globalData.subject4randomNumbers = Array
                                        .from({ length: data.subject4count })
                                        .map((element, index) => index + 1);
                                }
                            });
                            this.globalData.currentSubject = '科目一';
                        }

                    },
                    fail(error) {
                    }
                })
            }
        })
    },
    onShow: function (options) {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {},
})