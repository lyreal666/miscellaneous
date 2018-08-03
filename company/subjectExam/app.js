//app.js
App({
    globalMethods: {
    },
    globalData: {
        subject1data: {},
        subject4data: {}
    },
    onLaunch: function (options) {
        this.globalData.currentSubject = 1;

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
                                    const globalData = this.globalData;

                                    // TODO: http 传输json时碰到'[]'不会被解析成[]
                                    globalData.collections = data.userInfo.collections === '[]' ? [] : data.userInfo.collections;
                                    globalData.subject1data = Object.assign(globalData.subject1data, {
                                        subject: 1,
                                        subjectQC: data.subject1count,
                                        latestDoneQuestion: data.userInfo.latest_question1 || 1,
                                        rightQuestions: data.userInfo.subject1right === '[]' ? [] : data.userInfo.subject1right,
                                        failedQuestions: data.userInfo.subject1failed === '[]' ? [] : data.userInfo.subject1failed
                                    })
                                    
                                    globalData.subject4data = Object.assign(globalData.subject4data, {
                                        subject: 4,
                                        subjectQC: data.subject4count,
                                        latestDoneQuestion: data.userInfo.latest_question4 || 1,
                                        rightQuestions: data.userInfo.subject4right === '[]' ? [] : data.userInfo.subject4right,
                                        failedQuestions: data.userInfo.subject4failed === '[]' ? [] : data.userInfo.subject4failed
                                    })
                                }
                            });
                        }

                    },
                    fail(error) {
                    }
                })
            }
        })
    }
})