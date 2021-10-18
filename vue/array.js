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
    def(arrayMethods, ms, function mutator(...args) {
        const result = original.apply(this, args)
        // 当前的 __ob__ 就是 Observer 的实例
        const ob = this.__ob__
        // 处理数组中新增元素时实现数据观测
        // 日常开发中如果通过下标或者length属性来操作数组中数据此方法是无法观测数据变化的
        let inserted
        switch (ms) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }
        if (inserted) ob.observeArray(inserted)
        // 通知更新变化
        ob.dep.notify()
        return result
    })
})