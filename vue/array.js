import { def } from './utils.js'

/**
 * 如果是数组如何观测数据变化？
 * vue 针对数组的变化也是通过 getter 来添加对应的依赖
 * 但是我们观测的只是对象的 key，数组内的变化我们是无法观测的
 * 那么当我们数组内数据发生变化是无法触发 setter 的。
 * 我们可以通过重写数组身上的方法来通知变化，那么可以改变原数组的方法有 7 种。
 * [pop shift unshift push splice sort reverse]
 * 
 */

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const arrayMethodsList = [
    'pop',
    'shift',
    'unshift',
    'push',
    'splice',
    'sort',
    'reverse'
]

arrayMethodsList.forEach(ms => {
    // 缓存一下原有的方法
    const original = arrayProto[ms]
    /* Object.defineProperty(arrayMethods, ms, {
        enumerable: false,
        configurable: true,
        writable: true,
        // 为当前添加的方法绑定一个值，当我们使用方法时可以做一些事:
        value: function metator(...args) {
            const result = original.apply(this, args)
            // 例如变化通知...
            return result
        }
    }) */
    def(arrayMethods, ms, function mutator(...args) {
        const result = original.apply(this, args)
        // 当前的 __ob__ 就是 Observer 的实例
        const ob = this.__ob__
        // 通知更新变化
        ob.dep.notify()
        return result
    })
})