/**
 * 单页应用 single-page-application，简称 SPA
 * 通过动态重写当前的页面来与用户交互，而不需要重新加载整个页面。
 * 与传统 web 不同的是做到了前后端分离，使前端代码模块化、组件化。
 * 
 * 工作原理：改变路由时，页面不刷新。
 * 实现方式：使用 window.history 对象或 location.hash。
 */

window.history;
window.history.prototype;

// 包含浏览器历史信息，具有以下常用方法。
history.back();
history.forward();
history.go(n);

// Html5 新增了 pushState() 和 replaceState() 方法
// 这两种方法可以像历史栈中添加历史记录
window.history.pushState(state, title, url);
// state 状态对象，可以通过 history.state 获取
// title 新页面标题，目前所有浏览器都忽略此字段，传 null
// url 新页面地址，必须是和当前页面在同一个域

// 当用户点击浏览器上前进和后退或者调用 back、go、forward 方法就会触发 popstate 事件
const render = () => {
    return (
        <div>
            <a class="spa">spa1.html</a>
            <a class="spa">spa2.html</a>
            <button onclick="goBack()">back</button>
            <button onclick="goForward()">back</button>
        </div>
    )
};
document.querySelectorAll('spa').forEach(el => {
    el.addEventListener('click', (event) => {
        event.preventDefault();
        let link = el.textContent;
        window.history.pushState({ name: `spa${index + 1}` }, link, link);
        console.log(link, 'pushState');
    }, false)
})
window.addEventListener('popstate', (event) => {
    // 这里的 state 就是通过 pushState 传递
    console.log(event.state)
});
const goBack = () => window.history.back();
const goForward = () => window.history.forward();


// =================================================================

location.hash;
// 指的是当前 url 的锚，从 # 号开始的部分，
// 通过监听 hashchange 事件，也可以达到相同目的。

var render = () => {
    return (
        <div>
            <a class="spa">spa1.html</a>
            <a class="spa">spa2.html</a>
        </div>
    )
}
document.querySelectorAll('spa').forEach((el, index) => {
    el.addEventListener('click', (event) => {
        event.preventDefault();
        location.hash = index + 1;
    }, false)
});
window.addEventListener('hashchange', (event) => {
    console.log({ hash: location.hash });
});


