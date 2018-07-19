/*
 * @Author: ytj 
 * @Date: 2018-07-13 07:54:12 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-18 15:16:58
 */


Component({
    properties: {
        imgSrc: {
            type: String,
            value: '/common/imgs/quesMark.jpg'
        },
        iconText: {
            type: String,
            value: 'text-icon'
        }
    },
    methods: {
        handleClickIcon(event) {
            this.triggerEvent('click-icon', this.data.iconText, {bubbles: false});
        }
    }
})