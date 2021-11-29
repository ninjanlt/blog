/**
 * 
 *  Render 渲染函数
 *  自定义虚拟节点 VNode 更接近于 JSX 写法
 */
const template = () => ({
    // 函数式组件，没有自身管理的状态，也没有生命周期方法
    functional: true,
    // 组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象
    // {props,children,slots,scopedSlots,data,parent,listeners,injections}
    render: function (h, ctx) {
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
                    // .passive => &
                    // .capture => !
                    // .once => ~
                    // .capture.once => ~!
                    // 对于没有包含其它的修饰符时，可以通过 event 事件参数来判断
                    click: this.clickHandle,
                    '!click': this.doThisInCapturingMode,
                    '~keyup': this.doThisOnce,
                    '~!mouseover': this.doThisOnceInCapturingMode
                },
                // 监听组件原生事件
                nativeOn: {
                    click: this.nativeClickHandler
                },
                // 自定义指令
                directives: [],
                // 作用域插槽
                scopedSlots: {
                    default: props => h('span', props.text),
                    // name: props => VNode | Array <VNode> 
                },
                // 如果当前虚拟节点是其它组件的子组件，需为插槽指定名称
                slot: 'render',
                // 其它顶层属性
                key: 'index',
                ref: 'render-refs',
                // 如果在当前的虚拟节点内子节点也声明了 ref，此时 ref 就是一个数组
                refInFor: true
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

/**
 *
 *  JSX 应用写法
 *  npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
 *  'babel.config.js'
 *  module.exports = {
        presets: ['@vue/babel-preset-jsx'],
        ['@vue/babel-preset-jsx',
            {
                'injectH': false
            }]
        ]
    }
 */
const temp = () => ({
    render(h, ctx) {
        return (
            <div props={...ctx.props}></div>
        )
        // 或者...
        const attrs = { dateTime: '2021-11-27', id: 1 }
        return <header {...{ attrs: attrs }}></header>
        // 指令
        return <input vModel={this.newTodoText} />
        // 修饰符
        return <input vModel_trim={this.newTodoText} />
        // 事件
        return <input vOn:click={this.newTodoText} />
        // 修饰符
        return <input vOn:click_stop_prevent={this.newTodoText} />
        // v-if
        return (
            <div>
                {
                    attrs.id ? <span>attrs.id</span> : <div>none</div>
                }
            </div>
        )
        // v-for
        return (
            <ul>
                {list.map(item => <li>item</li>)}
            </ul>
        )
        // v-model
        return (
            <div>
                <input type="text" value={this.text} onInput={this.input} />
            </div>
        )
        // css style on
        return (
            <div
                id="div_box"
                onClick={() => this.handleClick}
                class={{ foo: true, bar: false }}
                style={{ color: 'green', fontSize: '14px' }}
            >
                <el-popver onShow={(event) => this.imgShow(event)}></el-popver>
            </div>
        )
        // switch case
        return (
            <div>
                {
                    (() => {
                        switch (type) {
                            case 'one':
                                return <span>one</span>
                            case 'two':
                                return <div>two</div>
                            default:
                                return (
                                    <ul>
                                        <li></li>
                                    </ul>
                                )
                        }
                    })()
                }
            </div>
        )
        // 监听多个事件
        return (
            <el-input
                value={this.value}
                on={{
                    focus: this.handleFocus,
                    input: this.handleInput
                }}
            ></el-input>
        )
    }
})