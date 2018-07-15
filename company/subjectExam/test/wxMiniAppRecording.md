# 记录使用小程序MINA框架的一些坑

### 不能在插值表达式中使用函数

只能使用变量绑定


### 事件不能传参

可以使用data-varName的方式在事件函数中使用event.currentTarget.dataset.varName的方式绑定，但是用起来比起直接绑定时传参麻烦太多了


### Page里面没有methods,Component里面有

为什么Page里面不添加一个methods属性,Page也是一个组件啊?之前就出现过我在Page.methods里面定义函数,结果无法调用;Page里面定义函数直接在Page option里面定义,不要在option.methods里面定义；


### 使用`scroll-view`时,必须定义white-space: nowrap => 不换行,才可以有滑动效果

这就很坑爹了,由于whiteSpace是继承属性,内部的所有text会受影响不换行,所以注意记得将内部的text的white-space改成normalrea,才能使文本正常换行显示


### 在Page.option和Component.option中,使用data和properties中的属性要用this.data.attr和this.properties.attr的形式

这和react很像, 如果像vue里面一样直接使用this.attr会返回undefined

### MINA框架的插值语法很奇葩

它在小程序中的显示的字符串从`<text>`标签最右边开始计算,直到`</text>`标签的上一行,其中同一行的连续多个空格会被压缩成一个, 可以直接使用\n,多个换行符,仍然多次换行

### wxss 支持的选择器很有限

目前能用的有
1. class 
2. #id
3. element
4. element, element
5. ::before
6. ::after

测试表明:
1. :nth-child伪类子选择器没有用
2. 子类选择器有用

### 使用scroll-view的一些坑

必须要设置的:
1. whiite-space: nowrap
2. 水平要设宽度,垂直要设高度
3. 水平要设置display: inline-block
> 水平滚动没必要设置flex

### 关于生命周期

![生命周期图](https://mp.weixin.qq.com/debug/wxadoc/dev/image/mina-lifecycle.png?t=2017112)
1. 暴露的生命周期函数有created，attached, ready, move, detached
2. 要获取data或props, 都可以通过this.data.attrName获取, 但是建议使用this.properties.attrName获取,这样一看就知道是获取prop属性
3. 在created生命周期函数中就可以获取data和props,但是此时调用this.setData无效,也不会报错, 可以在生命周期attached函数中定义
4. 想触发props的observe函数必须使用setData设置property

### MINA框架properties 双向传递很迷,不要用
需要子组件通知父组件触发函数，应该使用trggerEvent
但是注意使用setData来设置props

### 跨自定义组件是不能在外层组建获取子组建中事件源id和其他信息

### event.detail指的是自定义事件中的所携带的数据

