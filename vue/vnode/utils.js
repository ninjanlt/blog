import VNode from '../vnode'
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
export const createTextVNode = (val) => {
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