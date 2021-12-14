### redux
> 举例：想象你在银行 ATM 存钱的过程， 你（Components）按了存款的指令， 并把钱（data）放入机子中。ATM（Store）接收到你这个指令（Actions）会去在你的存款中加上一笔钱（Reducers）也就是执行你的指令，你无法直接取钱、存钱，需要经过 ATM（Store）进行操作（无法直接从 `store[propName]` 拿到属性，必须通过 `getState()`），你可以在全国各地的 ATM 中拿到你的钱（公共状态)

---

#### Store
1. 创建 `store` 实例来分发状态和存储数据

```jsx
// store.js 
import { createStore } from "redux"; 
// 需要在一开始就让 Redux 知道要怎样执行你的指令
import countReducer from './count-reducers' 
export default createStore(countReducer)
```

2. `APIs`

```jsx
store.getState() // 外部是无法直接访问 state，需要通过方法获取
store.dispatch(action) // 分发行为，通知 reducer 执行
store.subscribe(fn) // 监听 state，当 state 发生变化时，立即执行函数，用于通知视图更新

// 项目入口文件
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDom.render(<App />, document.getElementById('root'))
store.subscribe(() => {
    ReactDom.render(<App />, document.getElementById('root'))
})
```

---

#### Actions
1. 一个符合规则的 `action` 对象

```jsx
action = {type: 'ADD_COUNT', payload: data}
```

2. 指令文件

```jsx
// Action.js redux的动作， 单独一个文件管理 
import {INCREMENT, DECREMENT} from './constant' 
export const incrementAction = data => ({type: INCREMENT, data}) 
export const decrementAction = data => ({type: DECREMENT, data})
```

3. `Component` 中应用

```jsx
import React, { Component } from 'react' 
import store from '@/redux/store' 
import { incrementAction, decrementAction} from '@/redux/count_action'

export default class Header extends Component { 
    increament = (value) => { 
        store.dispatch(incrementAction(value))
    } 
}
```

4. 异步的 `actions`

```jsx
{/*
    这里 action 返回的一个函数，正常情况下 reducer 是无法处理非常规的 action 对象
    需要在 store 中添加 thunk 中间件
    npm install redux-thunk
*/}
export const addActionAsync = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: 'add', payload: data})
        }, time)
    }
}
// redux.js
import { createStore, applyMiddleware } from "redux"
import countReducer from './count-reducers' 
import thunk from 'redux-thunk'
export default createStore(countReducer, applyMiddleware(thunk))
```

---

#### Reducers

1. 在 `store.js` 文件中，需要通过 `createStore` 传入 `Reducers`，当接收什么指令时需要做的事
2. `reducers` 是一个纯函数

```jsx
const initState = 0 

export default function addReudcer (prevState = initState, action) {
    const { type, payload } = action
    switch (type) {
        case 'add':
            return prevState + payload
        default:
            return prevState // （初始化的时候，无指令， 返回默认值）
    }
}

// store.js
import { createStore, applyMiddleware } from "redux"
import addReducer from "./reducers/addReducer"
import thunk from 'redux-thunk'

export default createStore(addReducer, applyMiddleware(thunk))
```

3. 集中式暴漏 `reducer`

```jsx
// allReducers.js
import { combineReducers } from "redux";
import addReudcer from "./addReducer";
// 合并所有的 reducers
export default combineReducers({
    add: addReudcer
})

// store.js
import { createStore, applyMiddleware  } from "redux"
import allReducers from "./reducers/allReducers"
import thunk from 'redux-thunk'
export default createStore(allReducers, applyMiddleware(thunk))
```

---

#### connect
> Redux 要求我们当组件操作 store 中 state 的数据时要与 ui 组件相分离，ui组件只负责展示数据，而父组件通过 props 形式传入操作函数以及状态值

1. 通过 `connect` 立即执行函数帮助我们简化无需每次都要编写父组件

```jsx
{/* 此函数传入 connect 后会被执行, 并且返回值将作为 props 传入UI组件 */}
const mapStateToProps = (state) => {
    return {add: state.add}
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCount: value => dispatch(addAction(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Component)

// main.js
import React, { Component } from 'react'
import Home from "./containers/Home";
import store from './redux/store'; // 引入 store 对象

export default class App extends Component {
    render() {
        return (
            <div>
                <Home store={store}/> {/* 将store传入 */}
            </div>
        )
    }
}
// 子组件读取数据可以直接通过 props 取值
// 简写
export default connect( 
    state => ({ state }), 
    { 
        addCount: addAction, 
        addCountAsync: addActionAsync, 
    } 
)(Component)
```

2. 无需每个组件都手动传入 `store`

```jsx
import React from 'react'
import ReactDom from 'react-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

3. 配合可视化插件使用
    - 下载谷歌插件 `redux devtool`
    - 项目内开发环境下安装依赖 `npm install -dev--save redux-devtools-extension`

```jsx
// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import allReducer from "./reducers";

export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
```

---



