/**
 * dom 事件模型分为 3 种
 * 1. 原始事件模型 dom0级
 * 2. 标准事件模型 dom2级
 * 3. IE事件模型
 */

// 1. 原始事件模型以 on 开头，只支持冒泡不支持捕获，同一个类型事件只能绑定一次，后绑定的会覆盖先绑定的
var btn = document.getElementById('.btn');
btn.onclick = fun2;
btn.onclick = null;

// 2. 标准事件模型共有三个阶段冒泡，可以重复绑定多个事件回调
/**
 * 捕获事件从 document 一直向下传播依次检查节点是否绑定事件，有则执行
 * 事件到达目标元素, 触发目标元素的监听函数
 * 事件从目标元素冒泡到 document 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
 */
addEventListener(eventType, handler, useCapture)
removeEventListener('click', ()=>{}, false)

// 3. IE 事件流共有两个阶段
/**
 * 事件到达目标时，触发事件的目标函数
 * 事件从目标元素冒泡到 document 依次检查经过节点是否绑定事件监听函数，有则执行
 */
var btn = document.getElementById('.btn')
btn.attachEvent('onclick', showMessage)
btn.detachEvent('onclick', showMessage)


/**
 * 事件流
 * 由于 DOM 是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个执行顺序问题
 * 事件委派将事件统一绑定给元素的共同祖先元素，这样当后代元素上的事件触发时
 * 会一直冒泡到祖先元素我们通过事件函数 event.target 参数来获取子元素
 * 事件委派是利用了冒泡，通过委派可以减少事件绑定的次数提高程序的性能
 * 通过 event.stopPropagation() 来阻止事件冒泡
 * 
 * 阻止浏览器默认行为
 * dom0：return false
 * dom2：event.preventDefault()
 */


/**
 * dom 鼠标事件
 * onmousemove
 * 
 * 当鼠标移入父元素里面的子元素的时候，事件会移出然后再移入，也就是说事件元素会有切换，事件委派的时候，必须使用这一对；
 * onmouseover/onmouseout
 * 
 * 当鼠标移入父元素里面的子元素的时候，事件并没有移出而是再移入，也就是说事件元素没有切换，这样会造成html的结构混乱；
 * onmounseenter/onmouseleave
 * 
 * onmousedown/onmouseup
 * 
 */


/**
 * 键盘事件
 * keyup
 * keydown
 * focus
 * blur
 * event.keycode 键码
 * submit form表单事件
 * 
 */

 let form = document.createElement('form');
 form.action = 'https://google.com/search';
 form.method = 'GET';
 form.submit()

