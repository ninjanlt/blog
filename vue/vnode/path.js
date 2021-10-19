/**
 * vue DOM-diff 算法是一个怎样的过程？
 * DOM-diff 本身就是对新的节点和旧的节点做对比，找出差异的节点进行更新
 * 而这个过程就是 path 操作，意味打补丁。
 * 
 */

// 创建节点方法
function createElm(vnode, parentElm, refElm) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    // 是否为元素节点
    if (isDef(tag)) {
        // 这里的nodeOps只是对document进行了封装
        vnode.elm = nodeOps.createElement(tag, vnode)
        // 创建元素节点的子节点
        createChildren(vnode, children, insertedVnodeQueue)
        // 插入dom节点当中
        insert(parentElm, vnode.elm, refElm)
        // 是否为注释节点
    } else if (isTure(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text)
        insert(parentElm, vnode.elm, refElm)
        // 既不是元素节点也不是注释节点只剩下文本节点
    } else {
        vnode.elm = nodeOps.createTextNode(vnode.text)
        insert(parentElm, vnode.elm, refElm)
    }
}

// 删除节点
function removeElm(el) {
    const parent = nodeOps.parentNode(el)
    if (isDef(parent)) {
        nodeOps.removeChild(parent, el)
    }
}

/**
 * 更新节点相对复杂分为三种情况，其中静态节点不做更新处理
 * 1、静态节点
 *      - 如果 VNode 和 oldVNode 都属于静态节点则不做更新直接跳过
 * 2、文本节点
 *      - 如果 VNode 属于文本节点且 oldVNode 也属于文本节点
 *      - 那么对比两者文本节点是否不同，如果不同将 oldVNode 文本更新成 VNode 的内容
 *      - 如果 oldVNode 不是文本节点则直接调用 setTextNode 直接将该节点更新为文本节点
 * 3、元素节点
 * 
 */
function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    // vnode与oldVnode是否完全一样？若是，退出程序
    if (oldVnode === vnode) {
        return
    }
    const elm = vnode.elm = oldVnode.elm

    // vnode与oldVnode是否都是静态节点？若是，退出程序
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
        return
    }

    const oldCh = oldVnode.children
    const ch = vnode.children
    // vnode有text属性？若没有：
    if (isUndef(vnode.text)) {
        // vnode的子节点与oldVnode的子节点是否都存在？
        if (isDef(oldCh) && isDef(ch)) {
            // 若都存在，判断子节点是否相同，不同则更新子节点
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
        }
        // 若只有vnode的子节点存在
        else if (isDef(ch)) {
            /**
             * 判断oldVnode是否有文本？
             * 若没有，则把vnode的子节点添加到真实DOM中
             * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
             */
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
        }
        // 若只有oldnode的子节点存在
        else if (isDef(oldCh)) {
            // 清空DOM中的子节点
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        }
        // 若vnode和oldnode都没有子节点，但是oldnode中有文本
        else if (isDef(oldVnode.text)) {
            // 清空oldnode文本
            nodeOps.setTextContent(elm, '')
        }
        // 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么
    }
    // 若有，vnode的text属性与oldVnode的text属性是否相同？
    else if (oldVnode.text !== vnode.text) {
        // 若不相同：则用vnode的text替换真实DOM的文本
        nodeOps.setTextContent(elm, vnode.text)
    }
}