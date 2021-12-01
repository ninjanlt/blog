/**
 * 创建阶段 new Vue()
 * 源码位置：src/core/instance/index.js
 */

function Vue(options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

initMixin(Vue);

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$options = mergeOptions(
            // vm.constructor => Vue.options => initGlobalAPI(Vue)
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
        vm._self = vm
        initLifecycle(vm) // 初始化生命周期函数
        initEvents(vm) // 初始化事件
        initRender(vm) // 初始化渲染
        callHook(vm, 'beforeCreate') // 调用生命周期钩子 beforeCreate
        initInjections(vm) // 初始化注入
        initState(vm) // 初始化 props,methods,data,computed,watch
        initProvide(vm) // 初始化 provide
        callHook(vm, 'created') // 调用生命周期钩子 created

        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}

// 源码位置：src/shared/constants.js
export const ASSET_TYPES = ['component', 'directive', 'filter']

// 源码位置：src/core/global-api/index.js
export function initGlobalAPI(Vue) {
    // ...
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })

    // 把一些内置组件扩展到 vue.options.components
    // <keep-alive> <transition> <transition-group>
    extend(Vue.options.components, builtInComponents)
}

// 源码位置：src/core/util/options.js
export function mergeOptions(
    parent,
    child,
    vm
) {
    if (typeof child === 'function') {
        child = child.options
    }
    const extendsFrom = child.extends
    if (extendsFrom) {
        parent = mergeOptions(parent, extendsFrom, vm)
    }
    if (child.mixins) {
        for (let i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i], vm)
        }
    }
    const options = {}
    let key
    for (key in parent) {
        mergeField(key)
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }
    // 合并策略
    function mergeField(key) {
        const strat = strats[key] || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
}

// 生命周期钩子函数合并策略
function mergeHook(parentVal, childVal) {
    return (
        // 如果 child 存在
        childVal
            ? parentVal
                // 如果 parent 存在连接 child
                ? parentVal.concat(childVal)
                // 如果 parent 不存在判断 child 是否为数组
                : Array.isArray(childVal)
                    // 数组则直接返回
                    ? childVal
                    // 包装
                    : [childVal]
            : parentVal
    )
}

// 源码位置：src/shared/constants.js
export const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured'
]

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

// 源码位置：src/core/instance/lifecycle.js
export function callHook(vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm)
            } catch (e) {
                handleError(e, vm, `${hook} hook`)
            }
        }
    }
}
