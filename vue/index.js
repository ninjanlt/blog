/**
 * vue 如何实现数据的观测？
 * 通过对 data 数据的递归遍历添加 get 和 set 的劫持
 * 每当数据被读取或重新赋值时，通过 Object.defineProperty 进行观测
 * 
 */

class Observer {
    constructor(value) {
        this.value = value
        if (Array.isArray(value)) {
            // 如果是数组...
        } else {
            this.walk(value)
        }
    }

    // 数据递归观测方法
    walk(obj) {
        const keys = Object.keys(obj)
        for (key of keys) {
            defineReactive(obj, key)
        }
    }
}

// 实现数据观测的方法
function defineReactive(obj, key, val) {
    if (arguments.length === 2) {
        val = obj[key]
    }
    // 当传递的数据对象内部包含引用类型时我们进行递归观测
    if (typeof val === 'object') {
        new Observer(val)
    }

    // 为当前 key 创建一个依赖集合
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 收集依赖
            dep.depend()
            console.log(`${obj[key]} 数据被读取了`)
            return obj[key]
        },
        set(newVal) {
            if (newVal !== val) return
            console.log(`${obj[key]} 数据被修改了`)
            val = newVal
            // 通知更新依赖数据
            dep.notify()
        }
    })
}


/**
 * 如何将数据的变化更新到视图上？
 * 当数据被递归的添加观测时，我们声明一个收集此依赖数据的集合，表示依赖该数据的元素
 * 每当我们触发一下数据的 get 读取时，将对应的元素添加到集合中
 * 每当我们重新 set 改变数据的新值时，通知集合中所有的依赖元素，表示当前数据更新了
 * 在 getter 中收集依赖，在 setter 中通知依赖更新，消息订阅与发布的模式
 * 
 */

class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    // 删除依赖的方法
    removeSub(sub) {
        remove(this.subs, sub)
    }
    // 收集依赖的方法
    depend() {
        // ???
        if (window.target) {
            this.addSub(window.target)
        }
    }
    // 通知所有依赖更新的方法
    notify() {
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            // 调用依赖元素身上的更新方法
            subs[i].update()
        }
    }
}

// 查找对应的元素删除该项
function remove(list, el) {
    if (list.length) {
        const index = list.indexOf(el)
        if (index > -1) {
            return list.splice(index, 1)
        }
    }
}


/**
 * 此时已经完成数据的观测以及针对依赖数据的消息订阅与发布，但是我们应该通知谁去更新？
 * 现在就需要一个中间人 watcher 通过它我们来更新真正的视图，每一个依赖数据者
 * 
 */
class Watcher {
    
}