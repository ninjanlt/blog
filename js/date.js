/**
 * new Date(year, month, date, hours, minutes, seconds, ms)
 * 其中 month + 1 月份计数从 0 开始
 * 时间戳 1 * 24 * 60 * 60 * 1000
 * 
 */
// 创建一个日期的时间对象
let _1970 = new Date(0)
// 获取时间戳毫秒数
date.getTime(); 
// 传入一个时间格式字符串获取对应时间
let date = new Date('2017-04-08')

// 日期方法
date.getFullYear();
date.getMonth();
date.getDate();
date.getMinutes();
date.getSeconds();

date.toLocaleTimeString(); // 当前时间
date.toLocaleDateString(); // 当前日期
date.getTime(); // 1970 年 1 月 1 日之间的毫秒数
date.getDay(); // 星期几

// 解析字符串时间
Date.parse('YYYY-MM-DDTHH:mm:ss.sssZ')

// 计算两个日期差值
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9

// 时间交叉封装
function checkCrossTime(start,end,data){
    let x = +new Date(start),
        y = +new Date(end);
    try{
      data.forEach(i => {
        console.log(+new Date(i.a))
        // 设 y < a , b < x 情况下 其他均有冲突
        if(!(y < +new Date(i.a) || +new Date(i.b) < x)){
          throw new Error('时间存在交叉')
        }
      })
    }catch(err){
      if(err) return err
    }
    return true
}