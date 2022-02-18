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

> 公共代码需要做封装，使我们的状态可以进行通用

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

> 有计划的修改状态，修改数据状态添加约束

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


