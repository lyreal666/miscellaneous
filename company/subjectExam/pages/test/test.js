/*
 * @Author: ytj 
 * @Date: 2018-07-14 11:13:35 
 * @Last Modified by:   ytj 
 * @Last Modified time: 2018-07-14 11:13:35 
 */


Page({
    data: {
        msg: 'hello world'
    },
    getText() {
        return this.data.msg;
    },
    handleTap() {
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
    },
    methods: {
        funcInMethods () {
            console.log('Call funcInMethods');
        }
    }
})