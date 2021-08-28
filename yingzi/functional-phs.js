// 偏函数：根据特定的要求实现对应的功能，柯里化的进阶

function isType(type) {
    return function (obj) {
        return (
            Object.prototype.toString.call(obj) === "[object " + type + "]"
        )
    }
}

const isNumber = isType('Number')
const isString = isType('String')
console.log(isNumber(123))
console.log(isString('123'))


function wrap(tag) {
    const sTag = "<" + tag + ">"
    const eTag = "</" + tag + ">"
    return function (innerHtml) {
        return sTag + innerHtml + eTag
    }
}

const div = wrap('div')
document.write(div("偏函数"))

// 反柯里化函数
Function.prototype.unCurrying = function () {
    return Function.prototype.call.bind(this)
}