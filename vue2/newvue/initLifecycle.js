/**
 * 初始化生命周期函数详解
 * 源码位置：src/core/instance/lifecycle.js
 * 
 */

export function initLifecycle(vm) {
    const options = vm.$options
    // 直到找到非抽象组件并且存在父级
    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }

    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm

    vm.$children = []
    vm.$refs = {}

    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}