/**
 * 1. 字符串可以作为第一个参数
 * 2. 两个函数的返回值都是对应的定时器 ID
 * 3. 参数传参可以接收多个参数
 * 4. this指向问题
 * 5. 最小时间间隔 17ms
 */

 window.setTimeout('alert(123)', 1000) // 123

 let timerId = setTimeout(function (){console.log(123)}, 1000)
 clearTimeout(timerId)
 
 setTimeout(function(a, b, c){
     console.log(a, b, c) // 1 2 3
 }, 1000, 1, 2, 3)
 
 let obj = {
     name: 'a',
     walk(){
         console.log(this)
     }
 }
 setTimeout(obj.walk.bind(obj), 1000) // obj
 
 // html 规范 setTimeout 时间间隔是 4ms
 // 显示器刷新率 60hz 1000ms  1000/60 16.6ms