/**
 * async await 其实就是 Generator 的语法糖
 * await 等同于 yield，帮助我们简化 Promise 编码
 * 消灭多余回调函数以同步的编码方式去实现异步流程
 * 
 * 1. async 函数默认返回的是 promise 实例化的对象
 * 2. await 会阻止后续的代码执行，await 后续代码理解为 .then 回调
 * 3. promise 对象的结果由 async 函数执行的返回值决定的
 * 4. await 右侧的表达式为 promise 对象，await 返回的是 promise 成功值，如果是其他值，直接将此值作为 await 的返回值。
 * 
 */
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}
async function fn2 (){
    console.log('fn2')
}
fn1()
console.log(3) // 1 fn2 3 2


// await 外部函数必须由 async 声明的函数包裹，但是 async 函数可以不包含 await
async function dome() {
    try {
        let result = await index();
        console.log('我拿到了结果',result);
    }catch(err){
        console.log('失败了'+err);
    }
}
dome();


// polyfill
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function Promise(executor){
    const self = this
    self.state = PENDING
    self.value = null
    self.resolvedCb = []
    self.rejectedCb = []
    
    function resolve(val){
        if(self.state === PENDING){
            self.state = RESOLVED
            self.value = val
            self.resolvedCb.map(cb => cb(self.value))
        }
    }
    function reject(val){
        if(self.state === PENDING){
            self.state = REJECTED
            self.value = val
            self.rejectedCb.map(cb => cb(self.value))
        }
    }
    
    try{
        executor(resolve, reject)
    }catch(err){
        reject(err)
    }
}

// .then
Promise.prototype.then = function(success, error){
    const self = this
    success = typeof success === 'function' ? success : v => v
    error = typeof error === 'function' ? error : r => { throw r }
    if(self.state === PENDING){
        self.resolvedCb.push(success)
        self.rejectedCb.push(error)
    }
    if(self.state === RESOLVED){
        success(self.value)
    }
    if(self.state === REJECTED){
        error(self.value)
    }
}