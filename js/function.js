/**
 * 函数 this 会在运行时绑定到函数执行上下文
 * 全局环境中调用函数 this 非严格模式下指向的是 window 反之 undefined
 * 作为某个对象的方法调用 this 指向的是这个对象
 * 构造函数中的 this 指向当前的实例
 * 匿名函数中的 this 会指向 window 严格模式下是 undefined
 * 
 * 通过函数原型身上的方法改变 this 指向
 * call
 * bind
 * apply
 * 
 */

Function.prototype.call = function(context){
    const ctx = context || window
    ctx.fn = this
    const args = Array.from(arguments).slice(1)
    const res = arguments.length > 1 ? ctx.fn(...args) : ctx.fn()
    delete ctx.fn
    return res
}

Function.prototype.apply = function(context){
    const ctx = context || window
    ctx.fn = this
    const res = arguments.length > 1 ? ctx.fn(...arguments[1]) : ctx.fn()
    delete ctx.fn
    return res
}

Function.prototype.bind = function(context){
    const ctx = context || window
    ctx.fn = this
    const args = Array.from(arguments).slice(1)
    return function() {
        const allArgs = args.concat(Array.from(arguments))
        return ctx.fn.apply(context, allArgs)
    }
}


/**
 * 箭头函数
 * 1. 首先箭头函数是一个匿名函数，它没有自身的 this 它的 this 根据外部执行上下文而确定
 * 2. 没有自身的 this 说明它不具备原型对象，没有原型对象说明不能够调用函数身上的方法
 * 3. 同时不能够被实例化，箭头函数没有 arguments 对象
 * 4. 箭头函数一个参数情况下省略小括号，没有参数情况下不能省略，当函数体只有一条语句时可以省略花括号
 * 
 */
