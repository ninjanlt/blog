/*
 * vue中的虚拟dom是什么？
 * 虚拟dom其实就是用一个对象来描述一个node节点的操作
 * 虚拟dom可以帮助我们尽可能的减少dom的操作，避免频繁操作dom导致浏览器的重绘与回流
 * 通过vue中的虚拟dom算法对比出有差异的节点做对应的更新
 *
 */

export default class VNode {
    constructor(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ) {
        this.tag = tag          // 当前节点的标签名
        this.data = data        // 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息
        this.children = children  // 当前节点的子节点，是一个数组
        this.text = text     // 当前节点的文本
        this.elm = elm       // 当前虚拟节点对应的真实dom节点
        this.ns = undefined            // 当前节点的名字空间
        this.context = context          // 当前组件节点对应的Vue实例
        this.fnContext = undefined       // 函数式组件对应的Vue实例 
        this.fnOptions = undefined
        this.fnScopeId = undefined
        this.key = data && data.key           // 节点的key属性，被当作节点的标志，用以优化 
        this.componentOptions = componentOptions   // 组件的option选项 
        this.componentInstance = undefined       // 当前节点对应的组件的实例 
        this.parent = undefined           // 当前节点的父节点 
        this.raw = false         // 是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false 
        this.isStatic = false         // 静态节点标志 
        this.isRootInsert = true      // 是否作为跟节点插入 
        this.isComment = false             // 是否为注释节点 
        this.isCloned = false           // 是否为克隆节点 
        this.isOnce = false                // 是否有v-once指令 
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    get child() {
        return this.componentInstance
    }
}

/**
 * 通过vnode类型可以描述那些node节点信息
 * 注释节点
 * 文本节点
 * 元素节点
 * 组件节点
 * 函数式组件节点
 * 克隆节点
 *
 */

// 注释节点
export const createEmptyVNode = (text) => {
    const vnode = new VNode()
    vnode.text = text
    vnode.isComment = true
    return vnode
}

// 文本节点
export function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

// 克隆节点
export function cloneVNode(vnode) {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScopeId
    cloned.asyncMeta = vnode.asyncMeta
    cloned.isCloned = true
    return cloned
}

/**
 * 元素节点
 * <div id='a'><span>难凉热血</span></div>
 * {
 *    tag:'div',
 *    data:{},
 *    children:[
 *       {
 *         tag:'span',
 *         text:'难凉热血'
 *       }
 *    ]
 * }
 */


/**
 * 组件节点
 * componentOptions
 * componentInstance
 */


/**
 * 函数式组件节点
 * fnContext
 * fnOptions
 */