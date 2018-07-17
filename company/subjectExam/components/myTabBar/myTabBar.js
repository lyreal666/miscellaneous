/*
 * @Author: ytj 
 * @Date: 2018-07-13 07:53:59 
 * @Last Modified by: ytj
 * @Last Modified time: 2018-07-16 11:41:13
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
    },
    methods: {
        toggleTab(event) {
            const index = event.currentTarget.dataset.index;
            this.data.colors.fill('gray');
            this.data.colors[index] = '#3270b0';
            this.setData({
                colors: this.data.colors
            })

            if (index === 1) {
                this.triggerEvent('detail', 'studyMode', {bubbles: false})
            }
        },
    },

})