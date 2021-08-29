
### vue-router
> 用来实现 SPA 应用的 vue 插件

- 一个函数 `VueRouter` 创建路由器对象，配置路由
- 两个对象 `$route $router` 路由信息和路由器对象
- 三个标签 `<router-link> <router-view> <keep-alive>` 缓存路由组件对象
- 当对应的路由匹配成功，将自动设置 `class` 属性值 `.router-link-active`

```
npm install vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

---

#### dynamic segment
- 路由参数使用冒号 `:` 标记，当匹配到一个路由时路由参数会传递到 `$route.params`

模式 | 匹配路径 | $route.params
---|---|---
/user/:username | /user/evan | `{ username: 'evan' }`
/user/:username/post/:id | /user/evan/post/123 | `{ username: 'evan', id: '123' }`

- `$route.query` 表示查询字符串，路径 `/foo?id=1`
- 使用路由参数时，原来的组件实例会被复用，但是组件生命周期钩子不会再调用
- 可以使用通配符 `*` 来匹配任意路由，可以应用于 `404` 页面

---

#### nest router
- 父子嵌套路由，父组件中需要添加 `<router-view>` 标签来展示子路由

```js
//在上一级路由组件中写 children，底层内置不可更改命名
children: [
    {
    // 路径后可以跟占位符标识
      path: '/home/news/:id/:title',
      component: news
    },
    {
      name:'message',// 定义的 name 属性相当于跳转路径
      path: 'message',
      component: message
    }
]
```

---

#### program nav
- 除了使用 `<router-link>` 创建 `<a>` 标签定义导航连接，还可以通过 `router` 方法
- `this.$router.push`这个方法会向 `history` 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 `URL`

声明式 | 编程式
---|---
`<router-link :to="...">` | `router.push(...)`

```js
// 参数可以是一个字符串路径，或者一个描述地址的对象
$router.push('home')
// params跳转方式只能用 name 来指定
$router.push({ name: 'user', params: { userId: '123' }})
// query 跳转方式可以是 name 也可以是 path
$router.push({ path: 'register', query: { plan: 'private' }})
// 带查询参数，变成 /register?plan=private
```
- `this.$router.replace` 不会向 `history` 添加新记录

```js
<router-link :to="..." replace> 等同于  $router.replace(...)
```
- `this.$router.go(1)` 参数是一个整数，意思是在 `history` 记录中向前或者后退多少步

```js
// 在浏览器记录中前进一步，等同于 history.forward()
$router.go(1)
// 后退一步记录，等同于 history.back()
$router.go(-1)
```

---

#### naming router
- `params` 和 `query` 传参字段不一样
- `params` 只能用 `name`，`query` 都可以使用
- `query` 通过 `path` 切换路由，`params` 通过 `name` 切换路由

```js
注册路由: 
    {
        name: 'news' // 相当于指定了路径
        path: '/home/news/:id/:title',
        component: News
    }
跳转要给 to 传入对象: 
// 编程式路由导航
    <router-link :to="{ name: 'news', params: {id: 1, title: 'abc'} }">
    $router.push({ name: 'news', params: {id: 1, title: 'abc'} })
```

---

#### naming view
- 同一个路由中展示多个视图组件

```html
<router-view></router-view>
<router-view name="P"></router-view>
<router-view name="M"></router-view>

<script>
{
    path:'/home',
    components:{
        default:Home,
        P:Person,
        M:Miste
    }
}
</script>
```

---

#### redirect
- 匹配路由，重定向到对应的路径
- `/a` 的别名是 `/b`，意味着当用户访问 `/b` 时，`URL` 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样

```js
const router = new VueRouter({
    routes:[
        {path:'/a', redirect: '/b'},
        // 可以是命名路由的方式
        {path:'/a', redirect: {name: 'foo'}},
        // 可以是函数形式
        {path:'/a', redirect: to => {
            // 方法接收 目标路由 作为参数
            // return 重定向的 字符串路径/路径对象
        }},
        // 别名
        { path: '/a', component: A, alias: '/b' }
    ]
})
```

---

#### router props
- 路由信息包含一些路由相关的属性信息 `$route.path/params/query/meta`
- 路由传参形式

```html
<!-- params 参数 -->
<router-link to="/msite/1">Msite 组件</router-link>

<!--query 参数-->
<router-link to="/msite?id=1&user=123">Msite 组件</router-link>
```

- 路由元信息 `meta` 可以匹配多个路由嵌套记录，来检查记录中的 `meta` 字段

```js
// 父子路由嵌套
{
    path:'/home',
    component:Home,
    meta:{
        showFooter:true
    }
}
<Footer v-show="$route.meta.showFooter" />
```

- `props` 布尔值模式，通过解耦的方式来使用数据，减少 `$route` 的编写
- 针对 `params` 的参数形式

```js
// 当 props 为 true 的时候声明将参数 id 传入 props 对象中，需要在 props 中接收
{ path:'/xx/:id', component:xx, props:true }
```
- `props` 对象模式，静态传参
- 但是页面刷新后，`id` 依然可以获取，而 `msg` 此时就不存在了

```js
{ path:'/xx/:id', component:xx, props:{ id:1, msg:'参数数据' } }
```
- `props` 函数模式，动态传参将参数转为另一种类型

```js
{ path:'/xx/:id', component:x, props:(route) => ({query:route.query.q}) }
```

---

#### keppAlive
- 默认缓存的是所有对应的路由的，组件对象
- 组件需要添加一个命名 `name` 属性，可以用 `include` 进行缓存
    - 语法： `keep-alive`
    - 作用： 
        - 不使用的组件没有销毁，被 `keep-alive` 缓存起来
        - 再一次加载缓存的组件不需要重新创建，`mounted` 不会再执行
    - 特点：
        - activted： 组件被使用(被激活)
        - deactivted: 组件被缓存(没有使用的时候)

```js
// 通过include/exclude来指定缓存部分组件对象
<keep-alive exclude="Home" max="10">
  <router-view></router-view>
</keep-alive>
```

---

#### router guard
###### global
- beforeEach 全局前置守卫，路由导航被激活时

```js
// 可以做一些用户是否登录的判断
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```
- beforeResolve 全局解析守卫，真正去解析路由路径和渲染路由组件

```js
router.beforeResolve((to,from,next)=>{
    next()
})
```
- afterEach 全局后置钩子函数，路由跳转成功后执行

```js
router.afterEach((to,from)=>{})
```
###### component
- beforeRouteEnter 在被激活的组件里调用

```js
beforeRouteEnter (to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log(this);
    next() // 确认允许加载目标路由路径及路由组件了
},
```
- beforeRouteUpdate 当路由发生改变，组件被复用时调用

```js
beforeRouteUpdate (to, from, next) {
    // 可以访问组件实例 `this`
    console.log(this);
    // 作用等同于watch ---> $route
},
```
- beforeRouteLeave 导航离开该组件的对应路由时调用

```js
beforeRouteLeave (to, from, next) {
    // 可以访问组件实例 `this`
    next() // 放行 允许路由开始跳转
    sessionStorage.setItem('scrollTop', document.documentElement.scrollTop)
}
```

###### router
- beforeEnter 直接在路由配置，独享钩子

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

###### 执行过程
1. 导航被触发
2. 在失活的组件里调用离开守卫
3. 调用全局的 `beforeEach` 守卫
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫
5. 在路由配置里调用 `beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter`
8. 调用全局的 `beforeResolve` 守卫
9. 导航被确认
10. 调用全局的 `afterEach` 钩子
11. 触发 `DOM` 更新
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数

---

#### scrollBehavior
- 路由组件切换保持用户滚动状态，`keep-alive`做不到

```js
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // return { x: 0, y: 1000 }
    // console.log(savedPosition);
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
    console.log('路由跳转： scrollBehavior');
    console.log(to);
    console.log(from);
    if(to.path === '/msite'){
      return { x: 0, y: sessionStorage.getItem('scrollTop')*1 }
    }else {
      return { x: 0, y: 0 }
    }
  }
})
```
---
