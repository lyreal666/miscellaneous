/*
 * @Author: ytj 
 * @Date: 2018-07-12 09:12:47 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-15 17:49:16
 */

Page({
    data: {
        tabs: [
            {imgSrc: '/common/imgs/collection.png'},
            {imgSrc: '/common/imgs/studyMode.png'},
            {imgSrc: '/common/imgs/questionSelect.png'}
        ],
        showDetail: false
    },
    handleShowDetail() {
        this.setData({
            showDetail: !this.data.showDetail,
        })
    }
})