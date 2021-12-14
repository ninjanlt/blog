
### react
> 它是由 Facebook 开源，用于动态构建用户界面的 JavaScript 库，它只关注于 view 层面

1. 声明式编码
2. 组件化，模块化，容易复用
3. JSX 融合 html 写法
4. 高效，通过虚拟 dom diff 算法，最小化页面的重绘
5. 单向数据流，数据层流向视图层，通过事件再到数据

```
npm install -g create-react-app 
create-react-app my-app
```

---

#### jsx

1. 必须只有一个根标签，虚拟 dom 内不要写引号
2. 标签内混入 JS 代码要使用 `{}` 解析，`{}` 内解析的是表达式结果
3. 标签内使用 `class` 样式属性使用 `className` 属性
4. 内联样式使用 `style={{ key : value }}` 形式
5. 标签首字母小写默认解析 `html` 标签，大写开头会去渲染对应组件
6. 相当于 `React.createElement(component, props, ...children)` 语法糖

```jsx
let list = ['java', 'javascript', 'php', 'node', 'css', 'html']
let element = (
  <div>
    <h2 className="title">列表项</h2>
    <ul>{list.map((item, index) => <li key={index}>{item}</li>)}</ul>
  </div>
)
ReactDOM.render(element, document.getElementById('root'))
```

---

#### class or function

1. 类组件会产生组件对象具备自身的状态和生命周期钩子
2. 函数式组件不会产生组件对象，不具备自身状态和生命周期，可以接收唯一的 `props` 作为内部使用

```jsx
/**
    react 底层自动调用定义组件的工厂函数经过 babel 的编译
    开启了严格模式，禁止工厂函数里的 this 指向 window
*/
function Counter (){
    // console.log(this) undefined
    return <h2>函数式组件</h2>
}
ReactDOM.render(<Counter />, document.getElementById('root'))
```

3. 类组件会调用 `react` 组件基类创建一个实例对象，随后调用 `render` 方法

```jsx
class Counter extends React.Component {
    render(){
        console.log(this) // Counter
        return <h2>ES6类组件(复杂组件/有状态)</h2>
    }
}
ReactDOM.render(<Counter />, document.getElementById('root'))
```

---

#### state

1. 状态机通过更新组件实例的 `state` 来更新页面渲染
2. `state` 中的数据不要直接修改不会重新渲染组件，需要调用 `setState({})`
3. `react` 更新 `state` 是将多个 `setState()` 调用合并成一次，不要依赖当前 `props\state` 值来更新下一个状态
4. 解决获取当前状态 `setState` 接收一个函数使用

```jsx
class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = { count: 0 }
    }
    changeCount = () => {
        this.setState(function(props,state){
            return { state.count += props.increment }
        })
        // 异步 setState
        this.setState({count: count++}, ()=>{
            // 这里获取最新的 state 状态
            console.log(this.state.count)
        })
    }
    render(){
        return <span>{this.state.count}</span>
    }
}
```

---

#### props

1. 组件标签上的属性都会保存在 `props` 当中
2. 组件必须像纯函数一样保护自身 `props` 不被更改
3. 类型限制使用 `react` 提供的 `prop-types` 模块
4. 父传子通过 `props` 传递数据，子传父通过传递一个函数子组件传递参数
5. 父组件如果给一个非自闭合标签增加文本标签，子组件内部通过 `props.children` 属性获取

```jsx
import PropTypes form 'prop-types'

class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = { count: 0 }
    }
    static propTypes = {
        name: PropTypes.string.isRequired
    }
    static defaultProps = {
        age: 10
    }
    addCount = ({count}) => {
        this.setState({count})
    }
    render(){
        return (
            <div>
                <span>@</span>
                <Counter emitCount={this.addCount}  />
            </div>
        )
    }
}

function Counter (){
    function emitInfo() {
        props.emitCount({count: 2}) // 👈
    }
    return (
        <div>
            <button onClick={emitInfo}>点击发送消息</button>
        </div>
    )
}
Counter.propTypes = {
    name: PropTypes.string.isRequired
}
```

---

#### refs

1. 老版语法通过标签属性 `ref` 属性其值是字符串形式
2. 通过回调函数的形式传递 `ref` 参数
3. 通过 `React.createRef` 调用返回一个容器，容器中存储被 `ref` 标记的节点，通过 `current` 属性获取

```jsx
class Main extends React.Component{
    c = React.createRef()
    render(){
        return (
            <Counter ref="c" />
            <Counter ref={(el) => this.c = el} />
            <Counter ref={this.c} />
        )
    }
}
```

---

#### events

1. 为了更好的兼容性使用自定义合成事件 `onClick`，通过事件委托形式进行处理
2. 注意 `react` 事件接收的是一个函数的地址，并非函数调用返回值
3. 阻止默认行为，通过显示的形式使用 `event.preventDefault`

```jsx
class Demo extends React.Component{
    show = (event) => {
        event.preventDefault()
        console.log(this)
    }
    render(){
        return <button onClick={this.show}>insert</button>
        // return <button onClick={()=> this.show}>insert</button>
        // return <button onClick={this.show.bind(this)}>insert</button>
    }
}
```

---

#### control

1. 非受控组件通过表单提交事件直接将数据进行提交，采用原生事件
2. 受控组件将 `state` 数据与表单建立依赖关系，组件内部的 `state` 就成了唯一的数据源，通过合成事件与 `setState` 维护数据就能控制用户输入过程中发生的操作，实时渲染页面

---

#### hoc

1. 函数接收参数是一个函数或者函数调用返回的是一个函数，就是高阶函数
2. 柯里化通过连续调用的形式返回函数，实现多次接收参数最终统一处理

```js
function currying(fn, ...rest1){
    return function (...rest2) {
        return fn.apply(null, rest1.concat(rest2))
    }
}
```
```jsx
class Login extends React.Component{
    saveFormData = (type) => {
        return (event) => {}
    }
    render(){
        <form onSubmit={this.handleSubmit}>
            用户名: <input onChange={this.saveFormData('username')} />
            <button>登录</button>
        </form>
    }
}
```

---

#### old

1. 挂载
    - `constructor` 类组件初始化实例
    - `UNSAFE_componentWillMount` 组件将要进行挂载，此时页面白屏
    - `render` 组件渲染页面
    - `componentDidMount` 组件挂载之后，可以启动定时器操作
2. 更新
    - `UNSAFE_componentWillReceiveProps` 父组件重新 `render` 子组件钩子接收新的 `props` 数据
    - `shouldComponentUpdate(nextProps, nextState)` 调用 `setState` 触发，该钩子默认返回 `true` 进行数据渲染更新
    - `UNSAFE_componentWillUpdate` 调用 `forceUpdate` 强制更新页面，不对状态做修改
    - `render` 再次触发
    - `componentDidUpdate(prevProps, prevState)` 组件已更新完毕
3. 卸载
    - `componentWillUnmount` 组件将要卸载，做一些收尾工作，由 `ReactDOM.unmountComponentAtNode(el)` 触发

---

#### new

1. 新版本 `17+` 中使用老版本钩子，带有 `will` 钩子需要添加 `UNSAFE_` 前缀否则会有弃用警告，除了 `willUnmount` 钩子
2. 新版本 `react` 废弃三个钩子，新增两个钩子
3. `static getDerivedStateFromProps` 获取来自 `props` 的派生状态
    - 它需要给 `class` 使用，添加 `static` 标识，它必须返回一个状态对象或者是 `null`
    - 当 `state` 的值完全取决于 `props` 时可以使用它，没有自身状态的组件
    - 在 `DOM` 渲染之前执行并且后续的数据更新也会触发
4. `getSnapshotBeforeUpdate(preProps, preState)` 在更新之前获取一个快照，记录之前的状态
    - 它必须返回一个快照或者 `null`
    - 它的任何返回值都将传递给 `componentDidUpdate(pProps, pState, snapshot)` 第 3 个参数
    - 通常用来获取当前滚动的坐标

---

#### proxy

1. 在 `pakeage.json` 文件中直接配置 `"proxy"` 字段，值取自服务器域名端口号，缺点只能配置一台服务器代理 `url`
2. 创建 `src/setupProxy.js` 文件去配置代码，`React` 默认会取读取这个模块文件，要使用 `cjs` 语法去对外暴漏一个函数，同时需要引入 `http-proxy-middleware` 这个插件

```js
// setupProxy.js
const proxy = require('http-proxy-middleware')
module.exports = function(app){
    app.use(
        proxy('/api',{
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {'^/api', ''}
        })
        // 可以配置多个代理
    )
}
```

---

#### pubsub

1. 使用 `props` 直接传递函数的形式，状态驱动页面，状态定义在哪个组件更新的方法就在那个组件
2. 消息订阅与发布 `pubsub` 实现任意组件之间进行通信

```
npm install pubsub-js --save
```
```jsx
import Pubsub from 'pubsub-js'
class List extends React.Component {
    componentDidMount(){
    // 订阅消息
		this.token = PubSub.subscribe('save',(_,stateObj)=>{
			this.setState(stateObj)
		})
	}
	componentWillUnmount(){
    // 取消订阅
	    PubSub.unsubscribe(this.token)
	}
}
class Search extends React.Component {
    search = () => {
    // 触发订阅事件
        PubSub.publish('save',{isFirst:false,isLoading:true})
    }
}
```

---

#### pureFunction

1. 一个函数的返回值，只依赖于它自身的参数，并且执行时内部没有产生副作用，它就是纯函数
2. 副作用
    - 修改外部的变量
    - 调用 `DOM API` 修改页面
    - 发送 `AJAX` 请求
    - 包括 `console.log` 都是副作用
    - 造成外部可以观测到的行为
3. 纯函数的依赖状态只存在它执行的生命周期中，不能在方法中使用共享变量，会带来未知因素

```jsx
const foo = (count)=>{
    // 外部无法观测函数内部变量，此时就不是副作用
    const obj = {count: 1}
    count += obj.count
    return count
}
```

---

#### Fragment

1. `react` 要求我们编写 `html` 结构时最外层都必须由一个标签包裹，但当我们编写多余的 `div` 时会造成无用的层级嵌套

```jsx
import React, { Component,Fragment } from 'react'

export default class DemoFrag extends Component {
    render() {
        return (
            <Fragment key={index}>
               <p>fragment test</p>
            </Fragment>
            {/*
                简写
                <>
                    <span></span>
                </>
            */}
        )
    }
}
```

---

#### Context

1. 组件树下任意组件都可以获取到 `context` 分发的数据，就像发起了广播

```jsx
// context.js
import { createContext } from 'react'
const MyContext = createContext()
export default MyContext

// grandpa
import React, { Component, useState } from 'react'
import MyContext from '@/context'
import Father from './Father'
function Grandpa() {
    const [grandpaInfo, setGranpaInfo] = useState('grandpaInfo')
    return (
        <>
            <h4>Grandpa Component</h4>
            <MyContext.Provider value={grandpaInfo}>
                <Father />
            </MyContext.Provider>
        </>
    )
}
export default Grandpa

// father 不做任何数据传递
// son
import React, { Component } from 'react';
import MyContext from '@/context'
{/* class Son extends Component { // class
    static contextType = MyContext;
    render() {
        return (
            <>
                <h4>Son Component</h4>
                <p>info: {this.context}</p>
            </>
        );
    }
} */}
function Son(){
    return (
        <>
            <MyContext.Consumer>
                {
                    value => {
                        return <p>info: {value}</p>
                    }
                }
            </MyContext.Consumer>
        </>
    )
}
```

---

#### PureComponent
> 当父组件重新 `render` 子组件的数据没有改变，则子组件也会 `render`，此时会导致无意义刷新

1. `PureComponent` 内部对 `shouldComponentUpdate` 进行重写，观测了 `setState props` 的变化
2. 这个观测只对 `state props` 新旧的对比，浅层次的对比，如果发生了改变就会触发 `update`
3. 需要保证自身所继承的组件是一个纯的

---

#### RenderProps

1. 传统的 `props` 可以直接传递组件，但是没有办法给接收到的组件传递数据

```jsx
// parent
render() {
    return (
        <div>
            <A B={<B />} /> // 👈
        </div>
    )
}
// child
render(){
    return (
        <div>
            {this.props.B}
        </div>
    )
}
```

2. 解决无法向插槽传递数据问题

```jsx
// parent
render(){
    return (
        <div>
            <A render={(id)=> <B id={id} />} } />
        </div>
    )
}
// child
render(){
    const { id } = this.state
    return (
        <div>
            {this.props.render(id)}
        </div>
    )
}
```

---
