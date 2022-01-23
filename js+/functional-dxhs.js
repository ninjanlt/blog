// 惰性函数：通过对函数的重写，提高函数内部的执行效率

function addEvent(type, el, fn) {
    if (el.addEventListener) {
        // 因为在判断浏览器是否支持某种事件只需要判断一次
        // 此时重写 addEvent 函数 if else 只对事件兼容判断一次
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false)
        }
    } else if (el.attachEvent) {
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn)
        }
    } else {
        addEvent = function (type, el, fn) {
            el['on' + type] = fn
        }
    }
    // 这里调用是第一次绑定的结果
    return addEvent(type, el, fn)
}

addEvent('click', dom, function () { })

// 自调用的形式
// 上来直接调用一次判断当前浏览器环境
let addEvent = (function (type, el, fn) {
    if (el.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn, false)
        }
    } else if (el.attachEvent) {
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn)
        }
    } else {
        return function (type, el, fn) {
            el['on' + type] = fn
        }
    }
})()