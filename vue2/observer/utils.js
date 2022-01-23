// 解析路径，同时主动去触发一下 getter
const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) { return }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) { return }
            obj = obj[segments[i]]
        }
        return obj
    }
}

// 手动为该对象添加值
export function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true
    })
}

// 判断当前浏览器是否支持 __proto__ 属性
export const hasProto = '__proto__' in {}

// 给当前对象添加原型对象
export function protoAugment(target, src, keys) {
    target.__proto__ = src
}

// 手动为该对象添加隐藏值
export function copyAugment(target, src, keys) {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

// 判断当前传递的是否为对象类型
export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

// 查询当前对象是否已存在该属性
export function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}