#### redux

> 是一个状态管理器，状态是什么？状态就是数据，数据存放在管理器中，统一管理。

```js
const state = {
    count: 0
};

// 修改状态值，使用发布与订阅的模式进行更新依赖。
// state.count = 10;

const listeners = [];
// 订阅
function subscribe(listener){
    listeners.push(listener);
}
// 当 count 状态发生变化时通知订阅者更新数据
function changeCount(count){
    state.count = count;
    for(let i = 0; i < listeners.length; i++){
        const listener = listeners[i];
        listener();
    }
}
// 进行订阅
subscribe(()=>{
    console.log(state.count);
})
// 尝试触发修改 count 值
changeCount(10);
changeCount(20);
```

---

> 公共代码需要做封装，使我们的状态可以进行通用。

```js
const createStore = function(initState){
    let state = initState;
    let listeners = [];
    // 订阅
    function subscribe(listener) {
        listeners.push(listener);
    }
    // 更新状态
    function changeState(newState){
        state = newState;
        for(let i = 0; i < listeners.length; i++){
            const listener = listeners[i];
            listener();
        }
    }
    // 获取最新状态
    function getState(){
        return state;
    }
    return {
        subscribe,
        changeState,
        getState
    }
}

// 应用
const initState = {
    counter:{ count: 0 },
    info: {
        name: '',
        description: ''
    }
};
const store = createStore(initState);
store.subscribe(()=>{
    console.log(store.getState());
});
store.changeState({
    ...store.getState(),
    info:{
        name: 'lxm',
        description: 'redux-demo'
    }
});
```

---

> 有计划的修改状态，修改数据状态添加约束。

```js
function plan(state, action){
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

function createStore(plan, initState){
    // ...
    // 有计划的去更新状态
    function changeState(action){
        state = plan(state, action);
        for(let i = 0; i < listeners.length; i++){
            const listener = listeners[i];
            listener();
        }
    }
}

// 我们将更新计划传递给 store
const store = createStore(plan, initState);
store.changeState({type: 'INCREMENT'});
store.changeState({type: 'INCREMENT'});
store.changeState({count: 'abcdef'}); // 约束生效
```

---

> 更改一下名字，计划 plan = reducer，更新 changeState = dispath，reducer是一个计划函数接收老的state，返回新的state，当项目中有大量的state，需要做拆分和合并。

```js
// 更改个人信息的 reducer
function infoReducer(state, action){
    switch(action.type){
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        default:
            return state;
    }
}
// 用来计算 counter 数的 reducer
function counterReducer(state, action){
    //...
}

// 我们用 combineReducers 来合并多个 reducer 成一个函数
const reducer = combineReducers({
    info: infoReducer,
    counter: counterReducer,
})
// 这里实现的前提都要求 reducer 是一个纯函数
// 接收老的 state 返回新的 state
function combineReducers(reducers){
    const reducerKeys = Object.keys(reducers);
    return function combination(state = {}, action){
        const nextState = {};
        for(let i = 0; i < reducerKeys.length; i++){
            const key = reducerKeys[i];
            const reducer = reducers[key];
            // 保存一下之前老的 state 状态
            const previousStateForKey = state[key];
            // 组成新的 state 状态
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    }
}
```

---

> 上面通过将 reducers 按照组件的纬度进行拆分，通过 combineReducers 进行合并起来，但是 state 还是臃肿在一起，这样 state 单一的状态树将会非常庞大，难以维护，需要进行做拆分。

```js
// 将 reducer 和自身的管理的状态写在一起
const initState = { count: 0 };
function counterReducer(state, action){
    // 如果 state 没有初始值
    if(!state){ state = initState };
    switch(action.type){
        // ...
    }
};
const createStore = function(reducer, initState){
    let state = initState;
    let listeners = [];
    function subscribe(listener){
        listeners.push(listener);
    };
    function dispatch(action){
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    };
    function getState(){
        return state;
    };
    dispatch({ type: Symbol() });
    return {
        subscribe,
        dispatch,
        getState
    };
};
// 每一个 reducer 都会进行默认初始化自身状态
const store = createStore(reducer);
console.dir(store.getState());
```

---

> 中间件 middleware，中间件是对 dispatch 的扩展，函数重写。

```js
// 我们需要记录日志和记录异常，通常情况下我们可以这么写
const store = createStore(reducer);
const next = store.dispatch;
store.dispatch = action => {
    try{
        console.log('this state:', store.getState());
        console.log('action:', action);
        next(action);
        console.log('next state', store.getState());
    }catch(err){
        console.error('错误报告:', err);
    }
}
// 如果后续增加了其他需求，那么 dispatch 函数将很庞大
// 我们需要考虑如何实现扩展性很强的多中间件合作模式
// 提取日志中间件
const loggerMiddleware = action => {
    console.log('this state:', store.getState());
    console.log('action:', action);
    next(action);
    console.log('next state', store.getState());
}
// 提取异常中间件
const exceptionMiddleware = next => action => {
    try{
        // loggerMiddleware(action);
        // 这里默认写死了 store.dispatch
        // 导致我们的 loggerMiddleware 已经没有办法再拓展其他中间件
        next(action);
    }catch(err){
        console.error('错误报告:', err);
    }
}
store.dispatch = exceptionMiddleware(loggerMiddleware);
// loggerMiddleware
const loggerMiddleware = next => action => {};
// 如果我们将每一个中间件都以模块拆分，那么内部将无法读取 store 数据，我们将 store 也传递进去
const timeMiddleware = store => next => action => {};
// 应用例子
const store = createStore(reducer);
const next = store.dispatch;
const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
const time = timeMiddleware(store);
store.dispatch = exception(time(logger(next)));
// 优化封装，期望使用的方式
// 接收旧的，重组返回新的 createStore
const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);
const store = newCreateStore(reducer);
// 实现 applyMiddleware
const applyMiddleware = fcuntion(...middlewares){
    // 返回一个重写 createStore 方法
    return function rewriteCreateStoreFunc(oldCreateStore){
        // 返回重写后的 createStore 方法
        return function newCreateStore(reducer, initState){
            const store = oldCreateStore(reducer, initState);
            // 给每一个中间件都传递 store
            const chain = middlewares.map(middleware => middleware(store));
            let dispatch = store.dispatch;
            // **重点** 实现 exception(time(logger(dispatch)));
            chain.reverse().map(middleware => {
                // 重写后持续赋值
                dispatch = middleware(dispatch)
            })
            // 重写 dispatch
            store.dispatch = dispatch;
            return store;
        }
    }
}
```
