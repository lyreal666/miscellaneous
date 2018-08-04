# 科目考试小程序重构记录

## 18-8-2 星期四

发现一个问题, 由于科目一和科目四是共用同一个答题页面；一方面同一个组件用于不同的业务,这导致了在这个组件中到处存在判断，比如上传服务器时要传递科目类型，另一方面关于科目一的数据和科目二得数据都是分别用带有1或4的变量表示,这样每次要判断不同科目来使用不同的变量

解决方案:

1. 将数据从分散的的变成树状的

   ```javascript
   // 原本
   subject1QC = 1998;
   subject4QC = 1350;
   latestQuestion1 = 3;
   latestQuestion4 = 6;
   
   // 重构
   sub1data = {
       subject1QC: 1998,
       latestQuestion1: 3
   };
   
   sub4data = {
       subjectQC: 1350,
       latestQuestion: 6
   }
   
   ```

   

