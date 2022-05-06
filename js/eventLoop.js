/**
 * JS 是单线程操作的，即某一时间段只能做一件事
 * 如果是多线程的页面上 JS 操作删除 dom 一个要添加 dom，容易造成混乱
 * 为了解决单线程造成的问题，JS 运用了事件循环机制
 * 
 * 1. 同步任务在主线程上执行
 * 2. 异步任务而是通过Event Table去注册回调函数放入Event Queue队列当中
 * 3. 每当主线程执行完毕都会访问异步队列取对应的回调函数放置主线程执行
 * 4. 这个过程不断重复就形成了Event Loop
 * 5. 异步任务又分为宏任务和微任务，微任务的优先级高于宏任务
 * 
 */

// 微任务包含
Promise.then;
MutaionObserver;
process.nexTick(node);

// 宏任务包含
script;
setTimeout;
setInterval;
setImmediate;
UIRender;
NodeIO;
Ajax;
