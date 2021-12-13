
### react-router-dom

1. 原生 `html` 中靠 `<a>` 来跳转不同的页面，`React` 中使用路由 `<Link />` 链接实现切换组件

```html
import { Link, HashRouter as Router, Route } form 'react-router-dom'

<Router>
    <!-- 
        to: string | object
        to={{
            pathname: '/home', // 路径
            search: '?id=1', // 参数
            hash: '#home', // hash值
            state // 保存到 window.location 的 state 中
        }}
     -->
    <Link className="link_about" to="/about">About</Link>
    <Link className="link_about" to="/home" replace>Home</Link>
    <!-- 展示路由 -->
    <Route path="/about" component={About} />
    <Route path="/home" component={Home} />
</Router>
```

---

2. 路由组件与一般组件接收的 `props` 不同，路由组件接收三个固定属性
    - `history` 包含路由的跳转方法
    - `location` 包含路由当前所处位置
    - `match` 包含动态路由参数对象

```jsx
<Route to="/home" componet={Home} />

const Home = ({history, location, match}) => {
    return <span></span>
}
```

---

3. 内置 `<NavLink />` 组件触发点击默认会给当前链接添加 `active` 样式，可触发高亮效果，也可以通过 `activeClassName` 修改样式名称

```jsx
<NavLink 
    activeClassName="activeForce" 
    activeStyle={{color: '#fff'}} 
    to="/Home"
    isActive={this.isActiveHandle} // 当此NavLink被选中时，执行回调
    exact // 开启精准模式
/>
```

---

4. 路由可以通过 `children` 属性来指定标签体内容

```jsx
<Route path={to} children={({match})=> (
    <span>{match.path}</span>
)} />
```

---

5. 使用 `<Switch>` 组件当路由路由匹配上之后，不再继续匹配，不会重复渲染路由组件，开启路由精准匹配 `exact`

```jsx
<Switch>
    <Route path="/home" component={Home} exact />
    <!-- 不再匹配，不会触发渲染 -->
    <Route path="/home" component={Test} exact />
</Switch>
```

---

6. 解决路由多级文件结构刷新样式丢失，三种方法

```jsx
// 去掉 . 
<link rel="stylesheet" href="/bootstrap.css">
// 取静态资源路径
<link rel="stylesheet" href="%PUBLIC_URL%/bootstrap.css">
// 使用 hash 路由 # 号后面内容作为前端资源加载
<HashRouter></HashRouter> 
```

---

7. 路由组件重定向 `<Redirect />` 当所有路由路径无法精准匹配时跳转到指定路由，作为兜底选项

```html
<Switch>
    <Route path="/home" component={Home}/>
    <Route path="/test" component={Test}/>
    <Redirect to="/home"/>
</Switch>
```

---

#### router params state search

1. `params` 参数，占位符形式，传递参数接收到 `prop.match` 对象中，地址栏展现形式

```html
<Link to={`/about/${item.id}/${item.title}`} />
<Route path="/about/:id/:title" component={About} />
```

2. `search` 参数，编码形式为 `urlencode` 格式 `query` 查询字符串形式，传递参数接收到 `prop.location` 对象中，根据路由形式不同 `hash` 模式下使用 `URLSearchParams` 解析参数，`browser` 模式下使用 `qs` 库解析参数

```html
<Link to={`/about?id=${id}&title=${title}`} />
<Route path="/about" component={About}/>
```

3. `to` 对象 `query` 形式非明文传输，刷新页面参数丢失

```html
<Link to={{pathname:'/home', query: totalData}}>Home</Link>
```

4. `state` 参数，传递对象形式 `hash` 模型下刷新页面会导致参数丢失，传递至 `location` 对象中

```jsx
<Link to={{ pathname: '/about', state: {id: 1}}} />
<Route path="/about" component={About}/>
```

---

8. 路由跳转默认采用的是 `push` 压栈的结构，操作的都是浏览器的 `history` 历史记录，采用 `replace` 将替换 `history` 中的跳转记录

```jsx
<Link replace to={`/about/message`} />
```

---

9. 路由编程式导航，通过操作 `history` 对象身上方法进行跳转，可携带三种参数


```jsx
replaceLink = (id,title) => {
    this.props.history.replace(`/about/${id}/${title}`)
    this.props.history.replace(`/about?id=${id}&title=${title}`)
    this.props.history.replace(`/about`,{id,title})
}
```

---

10. 一般组件加工路由组件通过 `witchRouter` 函数

```jsx
import * as React from 'react'
import {withRouter} from 'react-router-dom'
class Header extends React.Component{}
export default withRouter(Header)
```

---

11. `Route` 组件有三种传递方式 `component` `render` `children`

```jsx
{/* component */}
<Route path='/about' component={About} /> 

{/* render */}
<Route path='/home' render={props => (<div {...props} >Home</div>)} />

{/* children match:boolean 用来判断是否与当前路径匹配 */}
<Route path='/nav' children={({props, match}) => (match ? <Nav {...props}/> : <div>time</div>)} />
```

---

12. 路由懒加载

```jsx
import React, { Component, lazy, Suspense } from 'react'
const About = lazy(() => import('./pages/About'))

{/* Suspense 可以接受一个 fallback 属性的组件， 用于产生过渡效果 */}
<div> 
    {/* 路由切換 */} 
    <Suspense fallback={<Loading />}>  {/* 过渡效果组件 */}
        <Route path='/about' component={About} /> 
        <Route path='/home' component={Home} /> 
    </Suspense> 
</div>
```

---