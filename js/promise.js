/**
 * Promise 其实是一个异步操作任务块，简单说就是一个容器，里面保存着某个未来才会结束的事件。
 * Promise 内部状态分为三种: pending fulfilled rejected
 * 通过调用 Promise 构造函数身上的方法来改变状态，Promise 状态一旦改变将无法变更
 * Promise 构造函数接收一个 executor 执行器函数该函数是同步的
 * 执行器函数接收两个参数 resolve 和 reject 通过调用这两个方法来改变 Promise 状态
 * 
 */

// Promise 作用：支持链式调用，解决了地狱回调的问题
let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('失败了');
    },1000)
});
promise.then(
    value => console.log(value),
    reason => console.log(reason)
)

// promise.prototype.finally 方法
new Promise((resolve,reject)=>{
    setTimeout(()=> reject('失败了'),2000)
})
.finally('总是会执行的str')
.then(
    result => console.log(result)
    error => console.log(error)
)

// promise.prototype.catch 方法
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(1)
    },1000)
}).catch(
    // 捕获错误
    reason => console.log('onRejected',reason)
)

// Promise.all 一败则败
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1);
    },2000)
});
let p2 = Promise.reject(2);
let p3 = Promise.resolve(3);

let p4 = Promise.all([p1,p2,p3]);
p4.then(
    value => console.log('成功',value),
    reason => console.log('失败',reason)
)

// Promise.race 竞速原则
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);
p
 .then(console.log)
 .catch(console.error);

// Promise.allSettled 等待所有promise状态都发生变更
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
  ];
  
Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => {
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
            alert(`${urls[num]}: ${result.value.status}`);
            }
            if (result.status == "rejected") {
            alert(`${urls[num]}: ${result.reason}`);
            }
        });
    });


/**
 * 边界问题
 * 1. 在 executor 函数中可以直接抛出异常将 pendding 状态改变为 rejected，相当于隐式的 try..catch;
 * 2. 中断 promise 链，在回调函数中返回一个 pendding 状态的 promise 对象 return new Promise(()=>{});
 * 3. promise 错误穿透，前面任何操作出现错误都会导致报错，需要使用 catch 进行捕获
 * 
 */

