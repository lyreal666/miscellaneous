/*
 * @Author: ytj 
 * @Date: 2018-07-13 07:53:59 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-18 15:13:07
 */

Component({
    data: {
        
    },
    properties: {
        tabs: {
            type: Array,
            value: [
                {imgSrc: '/common/icons/trafficSigns.png', tabText: '交通标志'},
                {imgSrc: '/common/icons/findSchool.png', tabText: '寻找驾校'},
                {imgSrc: '/common/icons/police.png', tabText: '交警手势'}
            ]
        },
        colors: {
            type: Array,
            value: ['gray', 'gray', 'gray'],
        },
        hasText: {
            type: Boolean,
            value: true
        },
        forPage: {
            type: String,
            value: 'index'
        }
    },
    methods: {
        toggleTab(event) {
            const index = event.currentTarget.dataset.index;
            this.triggerEvent('toggle-tab', {
                index,
                text: this.data.text || 'no text icon'
            }, { bubbles: false })
        },
    },

})