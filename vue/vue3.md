
### Vue3
> 对比 Vue2 六个方面的提升
- `Preformance` 性能比 `Vue2` 快`1.2~2`倍
- `Tree shaking support` 按需编译，体积更小
- `Composition Api` 组合`API` 相当于 `React Hook`
- `Custom Render API` 暴漏了自定义渲染`API`
- `Fragment, Teleport, Suspense` 更先进的组件

---

#### Vite
> 意图取代 webpack 的工具，实现原理通过 ES6 的 import 会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去 webpack 冗长的打包时间

```
$ npm install -g create-vite-app
$ create-vite-app <projectName>
$ cd <projectName>
$ npm install 
$ npm run dev
```

---

#### 对比 Vue2 缺点
1. 对 `TypeScript` 支持不友好，所有属性都放在了 `this` 对象上，难以推倒组件的数据类型
2. 大量的 `API` 挂载在 `Vue` 对象的原型上，难以实现 `TreeShaking`
3. 架构层面对跨平台 `dom` 渲染开发支持不友好
4. `CompositionAPI` 受 `ReactHook` 启发
5. 更方便的支持了 `jsx`
6. `Vue 3` 的 `Template` 支持多个根标签 `Vue 2` 不支持
7. 对虚拟 `DOM` 进行了重写、对模板的编译进行了优化操作

---

#### 性能优化
> diff：算法
- `Vue2` 中的虚拟算法采用的是全量对比，`Vue3` 新增了静态标记
- 在对上一次虚拟节点进行对比时，只对比带有 `Path Flag` 节点
- 并且可以通过 `flag` 的信息得知当前节点要对比的具体内容

> hoistStatic：静态提升
- `Vue2` 中无论元素是否参与更新，每次都会重新创建，然后再渲染
- `Vue3` 中对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用

> cacheHeadlers：事件侦听器缓存
- 默认情况下 `onClick` 会被视为动态绑定，所以每次都会追踪它的变化，但是因为是同一个函数同时 `Vue3` 在处理时没有添加动态标记，所以没有追踪变化，直接缓存起来复用

> ssr：渲染
- 当有大量静态的内容时，这些内容都会被当作字符串推进一个 `Buffer` 里面，即使存在动态绑定，会通过模板插值嵌入进去，这样会比虚拟`Dom`快上很多
- 当静态内容大到一定量级时，会用 `_createStaticVNode` 方法在客户端生成一个 `static node`，这些静态 `node`，会直接 `innerHtml`，就不需要创建对象，然后根据对象渲染

---

#### Composition API *
> 本质上是一个组合函数，通过一系列方法将所需要的函数变量注入到 Option API
- ==setup==
1. 无法访问 `this`、`data`、`computed`、`methods`，此时尚未创建组件实例，它接收两个参数 `props context`
2. 执行时机在 `beforeCreate` 之前，替代了这两个钩子，提供了统一的入口

```js
setup(props,context){
    context.attrs
    context.slots
    context.parent
    context.root
    context.emit
    context.refs
    return {}
}
```
3. `props` 用来接收组件传递的 `props` 数据
4. `context` 用来定义上下文, 上下文对象中包含了一些属性
5. 通过 `getCurrentInstance()` 来获取当前组件实例

---

- ==reactive==
1. 可以代理一个对象，但不能代理基本类型值，例如字符串、数字、布尔等，这是 `js` 语言的限制
2. 本质上就是将传入目标对象包装成 `Proxy`，通过代理对象去更新响应式数据
3. 修改源目标对象不会触发响应式更新视图，深层次的响应式对象影响性能

```js
setup(props, context) {
    let state = reactive({
      name: 'test'
    });
    return state
}
```

---

- ==shallowReactive==
1. 定义浅响应式数据，只有第一层被 `Proxy` 代理，触发响应式
2. `shallowReactive` 只监听了第一层属性的值，一旦发生改变，则更新视图

```js
import { effect, shallowReactive } from '@vue/reactivity'
// 使用 shallowReactive() 函数定义浅响应式数据
const obj = shallowReactive({ foo: { bar: 1 } })
effect(() => {
  console.log(obj.foo.bar)
})
obj.foo.bar = 2  // 无效
obj.foo = { bar: 2 }  // 有效
```

---

- ==ref==

1. 在 `Vue` 模板解析中不用通过 `value` 获取值，但是在 `Js` 代码块中需要通过 `value` 获取值，`.value` 对应的也是 `Proxy` 代理
2. `ref` 接受一个参数，返回响应式 `ref` 对象，一般是基本类型值`（String 、Nmuber 、Boolean ）`等或单值对象
3. 如果传入的参数是一个对象，将会调用 `reactive` 方法进行深层响应转换（此时访问 `ref` 中的对象会返回 `Proxy` 对象，说明是通过 `reactive` 创建的）

```js
RefImpl:{
    value: 'xxx',
    __v_isRef: true // 通过这个标识来判断是否是 ref 类型数据
}
import { reactive, ref, toRefs } form 'vue'
setup(){
    const count = ref(10)
    const obj = reactive({
        t: 100,
        count
    })
    // 通过reactive 来获取ref 的值时,不需要使用.value属性
    console.log(obj.count)
    return {
       ...toRefs(obj)
    }
}
```

- ==shallowRef==
1. 它只代理 `ref` 对象本身，也就是说只有 `.value` 是被代理的
2. `.value` 所引用的对象并没有被代理

```js
const refObj = shallowRef({ foo: 1 })
refObj.value.foo = 3 // 无效
```

- ==triggerRef==
1. `shallowRef()` 函数不会代理 `.value` 所引用的对象
2. 可以通过 `triggerRef()` 函数强制触发响应调用 `Set`
3. 调用它就可以立马更新视图，其接收一个参数 `state` ，即需要更新的 `ref` 对象

```js
const refVal = shallowRef({ foo: 1 })
effect(() => {
    console.log(refVal.value.foo)
})
refVal.value.foo = 2 // 无效
triggerRef(refVal)  // 强制 trigger
```


---

- ==toRef==
1. 用来把一个响应式对象的的某个 `key` 值转换成 `ref`
2. `ref` 是对原数据的拷贝，响应式数据对象值改变后会同步更新视图，不会影响到原始值
3. `toRef` 是对原数据的引用，响应式数据对象值改变后不会改变视图，会影响到原始值

```js
function toRef(target, key) {
    return {
        isRef: true,
        get value() {
            return target[key]
        },
        set value(newVal){
            target[key] = newVal
        }
    }
}
```

---

-  ==toRefs==
1. 可以将 `reactive()` 创建出来的响应式对象，转换为普通的对象
2. 这个对象上的每个属性节点，都是 `ref()` 类型的响应式数据
3. 如果直接使用 `toRefs(state)` 去创建响应式可以使用解构形式返回数据

```js
import { reactive, toRefs } from "@vue/composition-api"
export default {
  setup() {
    // 响应式数据
    const state = reactive({ count: 0, name: "zs" })
    return {
      // 非响应式数据
      // ...state,
      // 响应式数据
      ...toRefs(state)
    }
  }
};
```

---

- ==isRef==
1. 判断某个值是否为 `ref()` 创建出来的对象
2. 当需要展开某个可能为 `ref()` 创建出来的值的时候

```js
import { isRef, ref } from 'vue'
setup(){
    const name = ref('kk')
    console.log(isRef(name)) // true
    return { name }
}
```

- isReactive 判断数据对象是否是 `reactive`
- isProxy 判断数据对象是否是响应式


---

- ==toRaw==
1. 获取原始数据，对原始数据修改不会触发响应式，减少不必要的 `UI` 界面的渲染
2. 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新
2. 通过 `reactive ref` 生成的响应式数据，只是对原始数据的引用，包装成 `Proxy` 对象
4. `ref` 创建的响应式数据，要通过 `.value` 获取原始数据

```js
import { toRaw, reactive, readonly } from '@vue/reactivity'
const obj1 = {}
const reactiveProxy = reactive(obj1)
console.log(toRaw(reactiveProxy) === obj1)  // true
```

- ==markRaw==
1. 取消对原始数据的响应追踪
2. 实际上 `markRaw` 函数所做的事情，就是在数据对象上定义 `__v_skip` 属性，从而跳过代理

```js
import { markRaw } from '@vue/reactivity'
const obj = { foo: 1 }
markRaw(obj) // { foo: 1, __v_skip: true }
```

---

- ==readonly==
1. 提供深度只读数据，通过 `isReadonly` 判断是否是只读数据

```js
import { readonly } from '@vue/reactivity'
// 使用 reactive() 函数定义响应式数据
const obj = readonly({ text: 'hello' })
// Set operation on key "text" failed: target is readonly.
obj.text += ' world' 
```

- ==shallowReadonly==
1. 在 `Vue` 内部 `props` 就是使用 `shallowReadonly()` 函数来定义的
2. `shallowReadonly()` 定义浅只读数据，深层次对象值可以进行变更触发响应式更新

```js
import { effect, shallowReadonly } from '@vue/reactivity'
// 使用 shallowReadonly() 函数定义浅只读数据
const obj = shallowReadonly({ foo: { bar: 1 } })
obj.foo = { bar: 2 }  // Warn
obj.foo.bar = 2 // OK
```

---

- ==watchEffect==
1. 不需要手动传入依赖
2. 每次初始化时会执行一次回调函数来自动获取依赖
3. 无法获取到原值，只能得到变化后的值

```js
import { ref, watchEffect } from '@vue/compostion-api'
export default {
    setup(){
        // 监视 ref 数据源
        const count = ref(0)
        // 监视依赖有变化，立即执行
        cosnt stop = watchEffect(()=>{
            console.log('count value',count.value)
        })
        const increment = () => {
            count.value++
        }
        return { count, increment }
    }
}
```
4. 异步副作用函数 `onInvalidate`

```js
watchEffect(async (onInvalidate) => {
    let validate = true
    onInvalidate(() => {
        validate = false
    })
    const data = await fetch(obj.foo)
    if (validate){
        /* 正常使用 data */
    } else {
        /* 说明当前副作用已经无效了，抛弃即可 */
    }
})
```

---

#### 递归监听
> reactive ref 默认采用的是递归监听对每一层对象都进行包装成 proxy，数据量庞大时非常消耗性能

- 通过 `shallow[ref-reactive]` 创建的数据对象默认只对第一层数据做封装，`Vue` 监听的是 `.value` 的变化，并不是第一层数据的变化
- `Vue3` 中提供了 `triggerRef` 方法传递改变后的对象，去自动更新 `UI` 界面

---

#### 实例
> 通过 createApp 函数创建一个新的应用实例

- 通过传递一个选项对象来创建一个根实例，以及可选的嵌套、可复用的组件树
- 响应式属性将对象中现有的 `property` 加入到响应式系统中，属性发生变化视图也会变化，后增加的属性不会触发视图更新

```js
// 通过 freeze 可以阻止修改现有的 property，以为响应式系统无法再追踪
const obj = { name: 'lxm' }
Object.freeze(obj)
const vm = Vue.createApp({
    data(){
        return obj
    }
}).mount('#App')
```

- `vm` 实例身上暴露了一些实例 `property`

```js
vm.$data
vm.$props
vm.$el // 组件实例使用的根 DOM 元素
vm.$options
vm.$parent
vm.$root
vm.$slots
vm.$refs
vm.$attrs
```

---

#### 全局配置
- 通过 `Vue` 实例上 `config` 来配置，可以在挂载应用程序之前修改配置项

```js
const app = Vue.createApp({})
app.config = {}
```

- 为组件渲染功能的未捕获错误分配处理程序

```js
app.config.errorHandler = (err, vm, info) => {}
```

- 可以在应用程序内的任何组件实例中访问的全局属性

```js
const app = Vue.createApp({})
app.config.globalProperties.$http = 'xs'
```

- 获取当前组件上下文，全局属性

```js
setup() {
  const { ctx } = getCurrentInstance();
  ctx.$http
}
```

---

#### 模板语法
> 插值 Mustache 语法

- 绑定的数据对象上 `property` 发生变化插槽值的内容都会更新
- `Mustache` 语法不能作用于 `Html` 属性上，要通过 `v-bind` 指令

```html
<div>{{msg + '-'}}</div>
<div v-bind:id="item.id"></div>
```

> 指令 Directives

- 指令参数接收的参数是单个 `Javascript` 表达式，可以实现动态参数
- 动态参数预期是一个字符串，异常情况下为 `null`，默认移除绑定
- 避免使用大写字符命名键名，浏览器默认将 `attribute` 转小写

```html
<span :[attrname]="msg" ></span>
<a @[eventname]="handler" ></a>
<input v-bind:[ 'foo' + bar ]="value" ></input>
```

---

#### 计算属性
> 如果在页面中根据已有的数据使用大量的 Mustache 表达式解析模板，性能则非常差

1. 计算属性中依赖的响应数据发生改变，才会进行求值计算，计算属性有缓存

```js
import { computed, ref } from 'vue';
setup(){
    const age = ref(18)
// 根据 age 的值，创建一个响应式的计算属性 readOnlyAge
// 它会根据依赖的 ref 自动计算并返回一个新的 ref
    const readOnly = computed(()=> age.value++)
    return { age, readOnly }
}
```

2. 可以通过传递对象配置 `get set` 方法创建一个可读可写的计算属性

```js
import { computed, ref } from 'vue';
setup(){
    const age = ref(19)
    const computedAge = computed({
        get: ()=> age.value,
        set: value => age.value + value
    })
// 为计算属性赋值的操作，会触发 set 函数, 触发 set 函数后，age 的值会被更新
    age.value = 100
    return { age, computedAge }
}
```

---

#### 侦听器
> 数据变化时执行异步操作 watch( source, cb, [options] )

- `source` 用于指定监听的依赖对象，可以是表达式，`getter` 函数或者包含上述两种类型的数组（如果要监听多个值）
- `callback` 依赖对象变化后执行的回调函数，带有 `2` 个参数：`newVal，oldVal` 如果要监听多个数据每个参数可以是数组 `[newVal1, newVal2, ... newValN]，[oldVal1, oldVal2, ... oldValN]`
- `options` 可选参数，用于配置 `watch` 的类型，可以配置的属性有 `immediate`（立即触发回调函数） `deep`（深度监听）

1. 监听 `reactive` 数据

```js
import { reactive, toRefs, watch } from 'vue';
setup(){
    const state = reactive({name:'vue',age:10})
    watch(
    // 监听多个值 [() => state.age,() => state.name]
        () => state.age,
        (age,preAge) => {
            console.log(age); // 100
            console.log(preAge); // 10
        }
    )
// 修改age 时会触发watch 的回调, 打印变更前后的值
    state.age = 100
    return {...toRefs(state)}
}
```

2. 监听 `ref` 数据

```js
import { ref, watch } from 'vue';
setup(){
    const state = ref(10)
    watch(state,() => console.log(state.value)) // 100
    age.value = 100
    return { age }
}
```

3. 在 `setup()` 函数内创建的 `watch` 监视，会在当前组件被销毁的时候自动停止，明确停止监听

```js
import { reactive, toRefs, watch } from 'vue';
setup(){
    const state = reactive({name:'kk'})
    // 返回一个停止函数
    const stop = watch(
        () => state.name,
        (newv,oldv) => console.log(newv)
    )
    state.name = 'vue'
    setTimeout(()=>{
        stop()
    },1000)
    return {...toRefs(state)}
}
```

- vm 实例身上暴露了一些实例方法

```js
this.$watch
this.$emit // 父组件绑定到子组件的事件可供子组件分发调用
this.$forceUpdate // 迫使组件实例重新渲染
this.$nextTick
```

---

#### class style 绑定
>v-bind：表达式结果的类型除了字符串之外，还可以是对象或数组
- 动态的 `:class` 可以与静态的 `class` 共存，也可以通过计算属性返回一个 `classObject`
- 推荐使用数组语法根据条件进行切换

```html
<div :class="[isActive ? activeClass : errorClass]"></div>
<div :class="[{ active: isActive }, errorClass]"></div>
```

>绑定内联样式，css property可以使用驼峰 camelCase 或短横线分隔 kebab-case 来命名
- `:style` 中 `Vue` 将会自动检测添加浏览器引擎前缀

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

---

#### 条件列表渲染
- `v-if` 是对元素或组件进行销毁和重建，是惰性的具有更高的开销
- `v-show` 是通过 `display:[block,none]` 对元素隐藏和展示
- 避免在同一个元素中使用 `v-for v-if`，循环要比判断具备更高优先级
- `v-for` 可以遍历对象或数组，使用 `of in` 让语义化更接近
- 特殊指令 `key ref is`

```html
<component :is="currentView">
    <div ref="box"></div>
    <ul>
        <li v-for="item in items" :key="item.id">...</li>
    </ul>
</component>
```

- `Vue` 监听数组的变化，重写了数组底层的一些方法

```js
vm.array.push
vm.array.pop
vm.array.shift
vm.array.unshift
vm.array.splice
vm.array.sort
vm.array.reverse
```

- 组件使用 `v-for` 可以通过 `props` 传递遍历的数据

```html
<!-- 父组件 -->
<ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
</ul>
<!-- 子组件 -->
app.component('todo-item',{
    template: `
    <li>
        {{ title }}
        <button @click="$emit('remove')">Remove</button>
    </li>
    `
})
```

---

#### 事件处理
- 内联语句中需要访问原始的 `Dom` 事件，可以用特殊变量 `$event` 把它传入方法中
- 多事件处理器可以绑定多个方法，以逗号运算符隔开

```html
<button @click="one($event), two($event)">
  Submit
</button>
```

- `v-on` 事件修饰符可以进行串联，另外还有按键修饰符和系统修饰符

```js
.stop
.prevent
.capture
.self
.once
.passive // 提升移动端性能，滚动行为将会立即触发
```

- 表单双向数据绑定 `v-model` 本质上就是一个语法糖，它会根据控件的类型自动选取正确的方法来更新元素
- `v-model` 修饰符 `.lazy .number .trim`

```html
<!-- 在“change”时，而非“input”时更新 -->
<input v-model.lazy="msg" />
```

---

#### Component
>组件是可复用的组件实例，且带有一个名字
- 组件分为全局组件和局部组件，组件注册命名分为俩种方式 `kebab-case、PascalCase`
- 局部注册采用 `import` 引入 `componets:{}` 声明的方式

```js
Vue.createApp({...}).component('my-component-name', {
  // 全局注册组件 ...
})
```

- `prop` 向子组件传递参数，当一个值传递给 `prop attribute` 时，它会成为那个组件实例的属性
- 可以接收数字、布尔值、数组、对象，动态参数需要绑定 `v-bind`，静态参数则不需要
- `prop` 使父子组件之间成单向下行绑定，反之则不可以
- 每当父组件发生变更时，子组件 `prop` 都会进行刷新，因此如果你在子组件修改了引用类型数据则父组件数据也会变更

```js
props:{
    // 必填的字符串
    propA: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propB: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propC: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default:() => {}
    },
    // 自定义验证函数
    propD: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
}
```

- `$attrs` 非 `prop` 的 `Attribute` 自动添加到根节点上，通过设置 `inheritAttrs: false` 可以禁止组件的根元素继承 `attribute` 
- 如果想让传递的 `attribute` 作用于其它的元素身上需要绑定 `$attr` 属性，如果组件内包含其它子组件节点会提示警告

```js
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
    `
})
```

- 自定义事件，通过 `v-on` 事件监听器在 `Dom` 模板中都会转换成小写，推荐使用 `kebab-case` 命名
- 组件上 `v-model` 默认以 `modelValue` 作为 `prop` 参数和 `update:modelValue` 作为事件，同时可以绑定多个 `v-model`

```html
<my-component v-model:foo="bar"></my-component>

app.component('my-component', {
  props: {
    foo: String
  },
  template: `
    <input 
      type="text"
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
  `
})
```

- 插槽各组件之间作用域都是相互独立的（只有一种例外情况）

```html
<!-- v-slot 指令只能应用于 template 身上 -->
<base-layout>
    <template v-slot:header></template>
    <!-- 动态插槽 -->
    <template v-slot:[dynamicSlotName]></template>
</base-layout>
```

- 作用域插槽这样可以让 `v-slot` 直接写在组件上，通过子组件向父组件传递数据渲染

```html
<!-- 子组件内容结构 -->
<ul>
  <li v-for="( item, index ) in items">
    <!-- 这里的 slot 将传递给父级作用域 -->
    <slot v-bind:item="item"></slot>
  </li>
</ul>

<!-- 父组件 -->
<todo-list v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <!-- 读取 slot 子组件作用域传递的数据 -->
    <span class="green">{{ slotProps.item }}</span>
</todo-list>
```

- 解构插槽 `prop`

```html
<todo-list v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

- 动态组件使用 `keep-alive` 缓存组件实例，保留用户操作

```html
<!-- 参数支持 string，regExp，array -->
<keep-alive :include="['a', 'b']" :max="10">
  <component :is="view"></component>
</keep-alive>
```

- 异步组件 `defineAsyncComponent` 接收一个函数内部返回一个 `promise` 工厂函数，调用 `resolve` 回调加载
- 高阶用法参考官网，参数也可以接收一个对象，添加组件加载响应配置

```js
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
app.component('async-component', AsyncComp)
```

- 特殊的 `Html` 元素内部有标签结构限制，这样会导致使用组件会被提升到外部

```html
<!-- 使用 v-is 渲染组件 -->
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

- 组件使用 `template` 元素时，向组件传递的 `prop` 标签属性需要使用它的 `kebab-cased` 标签属性不区分大小写

---

#### 复用性组合
- 混入对象的钩子会在组件自身钩子之前调用，`mixin` 容易造成命名冲突，灵活性较差不能通过向 `mixin` 传递参数
- 自定义指令如果只是想在 `mounted、updated` 触发行为，可以传递一个函数，同时支持动态参数绑定指令

```js
app.directive('demo', (el, binding) => {
  console.log(el,binding)
})
```

- 渲染函数，`Vue` 通过虚拟 `dom` 来追踪自身的状态从而改变真实 `dom`
- `h()` 函数用来创建 `VNode` 的工具，`VNode` 必须是唯一的，不可以重复引用渲染相同的 `VNode`，但是可以渲染相同的子节点

```js
render(){
    return Vue.h('div', {}, this.$slots.default())
}
```

- 传入 `teleport` 挂载指定的选择器上

```html
<teleport to="#some-id" :disabled="displayVideoInline">
    <!--disabled 可用于禁用 <teleport> 的功能-->
</teleport>
```

---

#### 响应性
- `Proxy` 是一个包含另一个对象或函数并允许你对其进行拦截的对象，函数中可以添加拦截陷阱
- 可以通过 `Reflect.get(...arguments)` 返回 `Proxy` 结果值
- `Vue` 在 `Get` 处理器中添加 `track` 陷阱用来跟踪变动的值，在 `Set` 中添加 `trigger` 陷阱来更新最新值

```js
const obj = {name: 'test'}
const handle = {
    get(target,prop){
        track(target,prop)
        return Reflect.get(...arguments)
    }
    set(target,prop){
        trigger(target,prop)
        return Reflect.set(...arguments)
    }
}
let proxy = new Proxy(obj,handle)
```

- 计算属性 `computed` 通过带有 `get set` 函数的对象返回一个 `ref` 对象，或者可以接收一个 `get` 函数作为参数返回一个不可改变的 `ref` 对象

---

#### emit component options
- `vue3` 组件发送自定义事件需要定义在 `emits` 选项
- 如果不配置 `emits` 选项，分发的事件名称如果是原生事件会触发两次，比如 `click` 事件
- `emits` 接收数组和对象的方式，对象方式可以提供事件校验

```html
<div @click="$emit('click')"></div>

export default{
    emits:['click']
}
```

---

#### $refs 
1. 先给目标元素的 `ref` 属性设置一个值，假设为 `el`
2. 然后在 `setup` 函数中调用 `ref` 函数，值为 `null`，并赋值给变量 `el`，这里要注意，该变量名必须与我们给元素设置的 `ref` 属性名相同
3. 把对元素的引用变量 `el` 返回 `return` 出去

```html
<template>
  <div>
    <div ref="el">div元素</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    // 创建一个DOM引用，名称必须与元素的ref属性名相同
    const el = ref(null)

    // 在挂载后才能通过 el 获取到目标元素
    onMounted(() => {
      el.value.innerHTML = '内容被修改'
    })

    // 把创建的引用 return 出去
    return {el}
  }
}
</script>
```

---

#### provide, inject

> provide()和inject()用来实现多级嵌套组件之间的数据传递，父组件或祖先组件使用 provide()向下传递数据，子组件或子孙组件使用inject()来接收数据

```js
// 父组件
import {provide} from 'vue'
export default {
    setup() {
        const obj = ref('johnYu')
        // 向子孙组件传递数据provide(名称,数据)
        provide('name', obj)
    }
}

// 孙组件
import {inject} from 'vue'
export default {
    setup() {    
        // 接收父组件传递过来的数据inject(名称)
        const name = inject('name') // johnYu
        return {name}
    }
}
```

---

#### getCurrentInstance

> getCurrentInstance方法用于获取当前组件实例，仅在setup和生命周期中起作用

```js
import { getCurrentInstance, onBeforeUnmount } from 'vue';

const instance = getCurrentInstance();
// 判断当前组件实例是否存在
if (instance) {
    onBeforeUnmount(() => {
        /* ... */
     });
 }
```

> 通过instance中的ctx属性可以获得当前上下文，通过这个属性可以使用组件实例中的各种全局变量和属性

---

#### vuex4, vue router4

> 在vuex4中通过createStore创建Vuex实例，useStore可以获取实例，作用等同于vue2.0中的this.$store;

> Vue Router 4 中useRouter可以获取路由器，用来进行路由的跳转，作用等同于vue2.0的this.$router，useRoute就是钩子函数相当于vue2.0的this.$route

- store/index.ts

```js
import {createStore} from 'vuex';
const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {},
  modules: {}
});
```

- router/index.ts

```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { scrollBehavior } from './scrollBehaviour.ts';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // vite.config.vue中配置alias
    component: () => import('/@/views/home.vue') 
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: scrollBehavior,
});

export default router;
```

- App.vue

```js
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';
export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 用户名和密码
    const Form = reactive({
      username: "johnYu",
      password: "123456",
    });
    // 登录
    function handelLogin() {
      store.commit("setUser", {
        username: Form.username,
        password: Form.password,
      });
      ElMessage({
        type: 'success',
        message: '登陆成功',
        duration: 1500,
      });
      // 跳转到首页
      router.push({
         name: 'Home',
         params: {
           username: Form.username
         },
      });
    }
    return {
      Form,
      handelLogin
      };
  }
```

- home.vue

```js
import { useRouter, useRoute } from 'vue-router';
import Breadcrumb from '/@/components/Breadcrumb.vue';

export default defineComponent({
    name: 'Home',
    components: {
      Breadcrumb,
    },
    setup() {
      const route = useRoute();
      // 接收参数
      const username = route.params.username;
      return {username}
    }
})
```

- 导航守卫

> 由于使用 Composition API 的原因，setup函数里面分别使用onBeforeRouteLeave和onBeforeRouteUpdate 两个新增的 API 代替vue2.0中的beforeRouteLeave和beforeRouteUpdate 。

```js
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
   setup() {
      onBeforeRouteUpdate((to) => {
        if (to.name === 'Home'){
            /* ... */
        }
      });
   }
```

- useLink

> useLink它提供与router-link的v-slot API 相同的访问权限,将RouterLink的内部行为公开为Composition API函数,用于暴露底层的定制能力

```html
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { computed } from 'vue';
  import { RouterLink, useLink } from 'vue-router';

  export default {
    name: 'AppLink',

    props: {
      ...RouterLink.props,
      inactiveClass: String,
    },

    setup(props) {
      const { route, href, isActive, isExactActive, navigate } = useLink(props);
      const isExternalLink = computed(
        () => typeof props.to === 'string' && props.to.startsWith('http')
      );

      return { isExternalLink, href, navigate, isActive };
    },
  };
</script>
```

- 插槽 `prop` 的对象包含下面几个属性：
    1. `href` 解析后的 `URL` 将会作为一个 `a` 元素的 `href attribute`
    2. `route` 解析后的规范化的地址
    3. `navigate` 触发导航的函数，会在必要时自动阻止事件，和 `router-link` 同理
    4. `isActive` 如果需要应用激活的 `class` 则为 `true`，允许应用一个任意的 `class`
    5. `isExactActive` 如果需要应用精确激活的 `class` 则为 `true` 允许应用一个任意的 `class`

---