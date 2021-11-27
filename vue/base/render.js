/**
 * Render 渲染函数
 * 自定义虚拟节点 VNode 更接近于 JSX 写法
 */
const template = () => ({
    render: function (h) {
        return h(
            // {String | Object | Function} 
            // 一个 HTML 标签名、组件选项对象或者是一个异步的 Promise 函数并且 resolve
            'div',
            // {Object} 
            // 一个与模板中 attribute 对应的数据对象，可选。
            {
                // {string | object | array[string | object] }
                // 接受一个字符串、对象或字符串和对象组成的数组
                'class': { render_class: true },
                // {string | object | array[object] }
                // 接受一个字符串、对象，或对象组成的数组
                style: { color: 'green' },
                // 普通的 HTML attribute
                attrs: { id: 10 },
                // 组件 prop
                props: { dateTime: '2021-11-27' },
                // DOM property
                domProps: { innerHtml: 'render' },
                // 事件监听，不支持 v-on:keyup.enter 修饰器写法，需要添加 keyCode 写法
                on: {
                    click: this.clickHandle
                },
                // 监听组件原生事件
                nativeOn: {
                    click: this.nativeClickHandler
                }
            },
            // {String | Array}
            // 子级虚拟节点 (VNodes)，由 createElement() 构建而成
            // 也可以使用字符串来生成文本虚拟节点，可选。
            [
                '先写一些文字',
                h('h1', '一则头条'),
                h(MyComponent, {
                    props: {
                        someProp: 'foobar'
                    }
                })
            ]
        )
    }
})