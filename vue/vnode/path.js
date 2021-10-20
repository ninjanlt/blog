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

/**
 * 在更新子节点时如何对比差异？
 * 通过遍历新VNode身上的子节点保存当前的子节点，拿新的子节点与oldVNode子节点进行对比
 * 那么就是双层循环进行遍历，此时会出现四种情况
 *      - 创建节点：在老树中没有找到新树的节点，那么需要新增节点
 *      - 删除节点：在新树遍历完毕时，老树中还有剩余的子节点，那么需要删除这些子节点
 *      - 移动节点：在老树中发现有和新树相同的子节点，但是位置不同，那么需要校准子节点位置
 *      - 更新节点：在老树中发现有和新树相同的子节点，位置也相同，那么需要更新子节点
 *
 */

// 伪代码
for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    for (let j = 0; j < oldChildren.length; j++) {
        const oldChild = oldChildren[j];
        if (newChild === oldChild) {
            // 如果在oldChildren里找不到当前循环的newChildren里的子节点
            if (isUndef(idxInOld)) {
                // 新增节点并插入到合适位置
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
            } else {
                // 如果在oldChildren里找到了当前循环的newChildren里的子节点
                vnodeToMove = oldCh[idxInOld]
                // 如果两个节点相同
                if (sameVnode(vnodeToMove, newStartVnode)) {
                    // 调用patchVnode更新节点
                    patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
                    oldCh[idxInOld] = undefined
                    // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动
                    canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
                }
            }
        }
    }
}

/**
 * diff算法的优化？
 * 问题产生：
 *      - 假设新树中的四个节点只有最后一个节点发生的变更
 *      - 对照上述的遍历方式，那么我们需要将新树的前四个节点与老树进行对比，白白浪费的性能的消耗
 * 解决方案：
 *      - 首先对比所有未处理的节点，新树中第一个节点是否与旧树中第一个节点相同，若相同更新当前节点
 *      - 若不同，对比新树中最后一个节点是否与旧树中最后一个节点相同，若相同更新当前节点
 *      - 若不同，对比新树中最后一个节点是否与旧树中第一个节点相同，若相同更新当前节点
 *      - 若不同，对比新树中第一个节点是否与旧树中最后一个节点相同，若相同更新当前节点
 * 
 */
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0               // oldChildren开始索引
    let oldEndIdx = oldCh.length - 1   // oldChildren结束索引
    let oldStartVnode = oldCh[0]        // oldChildren中所有未处理节点中的第一个
    let oldEndVnode = oldCh[oldEndIdx]   // oldChildren中所有未处理节点中的最后一个

    let newStartIdx = 0               // newChildren开始索引
    let newEndIdx = newCh.length - 1   // newChildren结束索引
    let newStartVnode = newCh[0]        // newChildren中所有未处理节点中的第一个
    let newEndVnode = newCh[newEndIdx]  // newChildren中所有未处理节点中的最后一个

    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(newCh)
    }

    // 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx] // 如果oldStartVnode不存在，则直接跳过，比对下一个
        } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // 如果新前与旧前节点相同，就把两个节点进行patch更新
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 如果新后与旧后节点相同，就把两个节点进行patch更新
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 如果不属于以上四种情况，就进行常规的循环比对patch
            if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            idxInOld = isDef(newStartVnode.key)
                ? oldKeyToIdx[newStartVnode.key]
                : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
            // 如果在oldChildren里找不到当前循环的newChildren里的子节点
            if (isUndef(idxInOld)) {
                // 新增节点并插入到合适位置
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
            } else {
                // 如果在oldChildren里找到了当前循环的newChildren里的子节点
                vnodeToMove = oldCh[idxInOld]
                // 如果两个节点相同
                if (sameVnode(vnodeToMove, newStartVnode)) {
                    // 调用patchVnode更新节点
                    patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
                    oldCh[idxInOld] = undefined
                    // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动
                    canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
                } else {
                    // same key but different element. treat as new element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
                }
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }
    if (oldStartIdx > oldEndIdx) {
        /**
         * 如果oldChildren比newChildren先循环完毕，
         * 那么newChildren里面剩余的节点都是需要新增的节点，
         * 把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中
         */
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
        /**
         * 如果newChildren比oldChildren先循环完毕，
         * 那么oldChildren里面剩余的节点都是需要删除的节点，
         * 把[oldStartIdx, oldEndIdx]之间的所有节点都删除
         */
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}