/*
 * @Author: ytj 
 * @Date: 2018-07-13 07:54:12 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-17 17:11:54
 */


Component({
    properties: {
        imgSrc: {
            type: String,
            value: '/common/imgs/quesMark.jpg'
        },
        iconText: {
            type: String,
            value: '文字图标默认文字'
        }
    },
    methods: {
        handleClickIcon(event) {
            this.triggerEvent('click-icon', this.data.iconText, {bubbles: false});
        }
    }
})