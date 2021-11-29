### vuex
> vuex 是一种状态管理工具，它会集中式存储组件状态

#### store
> vuex的核心管理对象, 是组件与 vuex 通信的中间人

- 读取数据属性，`state` 包含最新状态的数据对象
- 派生数据，`getters` 通过计算 `state` 属性派生一个新数据
- 分发调用，`action` 通过调用 `dispatch` 来进行更新动作
- 同步调用，`mutation` 通过 `commit` 来更新状态
- 在 `Vue` 组件中访问 `this.$store` 来获取对象，需要在根组件中注入 `store` 机制，供子组件使用

```js
new Vue({
    el: '#app',
    store:store
})
```

---

#### state
> 多个子组件共享的数据，用于集中管理

```js
// vuex管理的状态对象，它内部管理了一些初始化数据，相当于 data
const state = {
  name: initValue
}
```

#### mapStates
- 当一个组件获取多个状态的时候，解决重复与冗余，可以使用 `mapState` 来映射计算属性

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
- 当映射的计算属性名称与`state`子节点相同时，可以使用数组方法传一个字符串

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
- `mapState` 函数返回的是一个对象，可以使用延展运算

```js
computed: {
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState(['count'])
}
this.count...
```

---

#### getters
- 包含多个计算属性 `getter` 的对象，来计算`state`的值
- `getter` 的返回值会根据它的依赖被缓存起来
- 且只有当它的依赖值发生了改变才会被重新计算

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
// 访问getters里的属性
this.$store.getters.doneTodos
```

#### mapGetters
- 将 `store` 中的 `getter` 映射到局部计算属性

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['doneTodosCount','anotherGetter'])
  }
}
```
- 如果想修改映射的属性名称，使用对象形式

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

---

#### mutations
- 包含多个直接更新 `state` 的方法 `(callback)` 对象
- 每个 `mutation` 都有一个字符串的 事件类型 `(type)` 和 一个 回调函数 `(handler)`
- `action` 中通过调用 `commit('mutation')` 去间接更新 `state` 中数据
- `mutations` 函数中无法处理异步数据，因为得不到最新的数据，更新数据前会拍一个快照 `payload`，记录更新前状态

```js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

- 对象的形式进行提交，传入额外的参数提交载荷 `payload`

```js
store.commit('increment',{amount:10})

mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### mapMatations
- 通过辅助函数将组件中的 `methods` 映射为 `store.commit` 调用

```js
import { mapMutations } from 'vuex'
export default {
    methods:{
        ...mapMutations(['increment','incrementBy']),
        ...mapMutations({ add: 'increment' })
    }
}
```


---

#### actions
- 包含多个事件回调函数的对象，间接更新 `state` 状态
- 通过执行 `context.commit()` 来调用 `mutation` 同时将异步数据交给 `mutation`

```js
this.$store.dispatch('incrementAsync', data)

const actions = {
  incrementAsync (context, data) {
    context.commit('mutation', {data})
  }
  // incrementAsync ({commit, state}, data) {
  //   commit('mutation', {data})
  // }
}
```

- `actions` 内部可以包含异步代码（定时器, ajax）或逻辑代码，默认返回一个 `promise` 对象

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
}).then(() => {})
```
- `Action` 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象
- 通过上下文对象 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

- 在组件中批量分发多个 `action`

```js
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([ 'increment', 'incrementBy' ]),
    ...mapActions({ add: 'increment' })
  }
}
```

---

#### modules
>解决store对象，数据复杂臃肿，分割成模块管理
- 包含多个 `module` 的对象
- 一个 `module` 是一个包含 `state/mutations/actions/getters` 的对象
- 是将一复杂应用的 `vuex` 代码进行多模块拆分的第 2 种方式
- 命名空间 `namespaced: true` 模块中所有的方法自动根据模块注册路径命名
- 映射方法也会改变，需要绑定命名空间名称

```js
const user = {
  namespaced: true
  state: {},
  mutations: {},
  actions: {},
  getters: {}
}
const setting = {
  namespaced: true
  state: {},
  mutations: {},
  actions: {},
  getters: {}
}

const store = new Vuex.Store({
  modules: {
    user: user,
    setting: setting
  }
})

computed:{
    ...mapState(['user/name']),
    ...mapState({
        name: state => state.user.name
    })
}
methods:{
    ...mapActions(['user/action']),
    this['user/action'](data){}
}
```

- 通过使用 `createNamespacedHelpers` 创建基于命名空间辅助函数，返回一个对象包含映射方法

```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
    computed:{
        ...mapState(['name'])
    },
    methods:{
        ...mapActions(['action'])
    }
}
```

---

#### plugins
- `plgugins` 需要对外暴漏一个函数

```js
const persist = store => {
    stroe.subscribe((mutation,state)=>{
        // 监听 mutation 调用
    })
}
new Vuex({
// 开启严格模式
    strict: process.env.NODE_ENV !== 'production'
    plugins:[persist]
})
```

---

#### 常见问题
>刷新Vuex数据丢失
1. 问题原因： 
   - Vuex的数据保存在运行的内存中
   - 刷新页面会重新初始化整个应用，重新分配内存
2. 解决方案：
   - 当页面刷新的时候重新发请求获取数据，更新Vuex中的数据
   - 利用页面刷新的事件  + sessionStorage
      - 在unload事件的回调中将数据保存至sessionStorage中
      - 在组件重新加载之后从sessionStorage中读取并更新至Vuex中
3. 重新发送ajax弊端：
    - 用户频繁刷新，会对服务器造成压力，浪费资源
    - 有的服务器会做请求拦截

---