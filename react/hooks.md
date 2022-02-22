### Hooks

> react hook 拥抱函数式编程、解决函数式组件无状态使其拥有持续化状态、提高组件复用。

---

#### useState
> setState 是异步执行，采用替换的策略

```jsx
function Example(){
    const [count, setCount] = useState(0);
    const [obj, setObj] = useState({name: null});
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=> setCount(count+1)}>Click me</button>
        </div>
    )
};
```

---

#### useEffect
> 副作用函数，依赖数据发生变化时执行，用来监听状态变化，模拟生命周期

1. effect 按照在 render 后按照前后编写顺序执行
2. effect 没有依赖时，在 render 后顺序执行
3. effect 内部执行是异步的，它内部使用 state 的值是固定的，不会被改变
4. effect 依赖 `[]` 时相当于 componentDidMount
5. effect 返回一个匿名函数相当于 componentUnMount

```jsx
useEffect(() => {
    // 依赖发生变化了...
    // componentWillUpdate or componentDidMount
    // 请求接口，处理异步行为
    return () => {
        // 下一次useEffect运行前被执行
        // componentWillUnmount
        // 这里常用来解绑事件，取消订阅
    };
}, [dependencies]);

useEffect(() => {
    console.log('useEffect ---> 无依赖');
});
useEffect(() => {
    console.log('componentDidMount ---> 空数组');
}, []);
useEffect(() => {
    console.log('useEffect ---> 依赖:', count);
}, [count]);
useEffect(()=>{
    const timeId = setInterval(()=>{
        // 这里输出的是固定值
        console.log('setInterval --->', count) // 1
    },1000);
    return ()=>{
        clearInterval(timeId);
    }
},[count]);
```

---

#### useContext
> 跨组件共享数据的钩子函数

```jsx
// useContext 接收一个 React.createContext 创建的返回值
const MyContext = React.createContext();
function Demo(){
    const [count, setCount] = useState(0);
    return (
        <div>
            {(() => {
                console.log('Demo-render');
            })()}
            <button onClick={() => setCount(count + 1)}>click me</button>
            <MyContext.Provider value={count}>
                <Child1 />
                <Child2 />
            </MyContext.Provider>
        </div>
    )
}
function Child1(){
    const count = useContext(MyContext);
    console.log('child1-rerender', count);
}
function Child2(){
    console.log('child2-rerender');
}
// <MyContext.Provider> 传递的value值发生变化时，无论当前子组件是否使用，都会重新触发渲染，包裹的越多层级越深，性能影响越大。
// 如何让 Child2 避免不必要渲染？
// 使用 React.memo 只会对复杂对象做浅层对比，控制过程传递第二个自定义比较函数参数
const Child2 = React.memo((props) => {
    return <div>Child2</div>;
})
```

---
