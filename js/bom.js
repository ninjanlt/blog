/**
 * 浏览器模型
 */

location.href = 'https://www.baidu.com';
location.replace("http://www.baidu.com"); // 不可回退
location.reload(); // 刷新页面
 
window.onload // 等待dom元素加载完成回调
window.onresize // 浏览器窗口发生改变，就会执行这个事件
window.onscroll // 浏览器滚动条，触发事件
window.open(url, name, 'width=500, height=600')
 
history.back();
history.forward();
history.go(1);
 
navigator // 浏览器本身的信息
screen // 显示屏幕的宽高分辨率


/**
 * 视口元素操作属性
 * 
 * clientX & clientY 鼠标相对视口的水平距离和垂直距离，相对的是视口的左上角
 * pageX & pageY 鼠标相对页面的水平距离和垂直距离，相对的是页面的左上角
 * offsetX & offsetY 鼠标相对自身元素的水平距离和垂直距离，相对的是自身元素左上角
 * offsetWidth & offsetHeight 内容 + padding + border的宽高
 * offsetLeft & offsetTop 元素的偏倚量：可以认为就是拿的定位left、top值
 * clientWidth & clientHeight 元素内容 + padding的宽高
 * clientLeft & clientTop 元素左、上边框大小
 * scrollTop & scrollLeft	元素内容向上、左滚动的距离
 * getBoundingClientRect() 计算元素到视口上方和左边的距离
 * 
 */


/**
 * 滚动条控制
 * 
 * 单独的给body或者html设置overflow:scroll滚动条打开的全部都是document的滚动条
 * 如果两个元素同时设置overflow:scroll属性：body设置的是scroll,html设置是hidden,那么document的滚动条被关闭，body身上的滚动条会打开。相反，body身上被关闭，document身上的被打开。
 * 如果两个元素同时设置overflow:hidden；那么系统的两个滚动条全部被关闭；
 * 如果两个都设置overflow:scroll,那么html会打开document身上的，而body会打开自己身上的滚动条；
 * 
 */


/**
 * 浏览器页面生命周期
 * 
 * DOMContentLoaded —— DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。
 * load —— 外部资源已加载完成，样式已被应用，图片大小也已知了。
 * beforeunload/unload —— 当用户正在离开页面时。
 * document.readyState 属性可以为我们提供当前加载状态的信息。
 * 
 */

document.addEventListener('DOMContentLoaded', function(event){
    // 该事件在文档加载完成并且 DOM 构建完成时触发。
    event.type
    event.currentTarget
    event.clientX / event.clientY
})