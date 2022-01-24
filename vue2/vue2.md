### Vue2
> 一种渐进式的javascript框架，它是以数据进行驱动，动态构建显示用户界面

1. 编码简洁, 体积小, 运行效率高, 适合移动`/PC`端开发
2. 遵循 `MVVM` 模式
3. 它本身只关注 `UI`, 可以轻松引入 `vue` 插件或其它第三库开发项目
4. 借鉴 `angular` 的模板和数据绑定技术
5. 借鉴 `react` 的组件化和虚拟 `DOM` 技术

#### mvvm
- mvc
1. model模型：负责在数据库中存取数据
2. view视图：用来展现数据
3. controller控制器：负责通过视图读取数据，控制用户输入，并向模型发送数据

- mvvm
> 数据响应式、模板引擎以及渲染

1. model模型：负责处理业务逻辑以及和服务器端进行交互
2. view视图：负责将数据模型转化为`UI`展示出来，可以简单的理解为`HTML`页面
3. viewModel视图模型：相当于一个绑定器，通过 `vm` 读取 `model` 中的数据显示到 `view` 上，同时 `view` 上的数据发生改变，`vm` 也可以将输入数据保存在 `model` 中

#### vue options
- el
1. 指定 `dom` 标签容器的选择器
2. `Vue` 就会管理对应的标签及其子标签

---

- data
1. 组件实例对象 data 必须为函数，目的是为了防止多个组件实例共用一个 data，函数的形式采用工厂函数每次创建都会返回一个新的 data 对象
2. 根实例对象采用的是单例，不会造成数据污染
3. 数据代理: 由 `vm` 对象来代理对 `data` 中所有属性的操作(读/写)

---

- methods
1. 包含多个方法的对象
2. 供页面中的事件指令来绑定回调
3. 回调函数默认有 `event` 参数, 但也可以指定自己的参数
4. 所有的方法由 `vue` 对象来调用, 访问 `data` 中的属性直接使用 `this.xxx`

---

- computed
1. 包含多个方法的对象，多对一的关系
2. 对状态属性进行计算返回一个新的数据, 并且供页面获取显示
3. 一般情况下是相当于是一个只读的属性
4. 利用 `set/get` 方法来实现属性数据的计算读取,同时监视属性数据的变化
5. 计算属性有缓存，只有当它依赖的值发生改变，才会重新去计算 `computed` 的值
6. 不支持异步，当 `computed` 内有异步操作时无效，无法监听数据的变化

---

- watch
1. 包含多个属性监视的对象
2. 分为一般监视和深度监视 `deep` 属性，同时支持首次触发 `immediate`
3. 使用 `watch` 允许执行一个异步`API`，一对多的关系

```js
watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true, // 立即以表达式的当前值触发回调
    // deep: true
  }
}
vm.$watch( expOrFn, callback, [options] )
```

---

#### vm lifecycle
1. this 代表的是组件的实例
2. vm 代表的是当前应用的实例
3. 组件实例.__proto__ == vm （组件的实例可以访问 vm 原型上的所有东西）
---

- beforeCreate
1. 不能通过 vm 读取 data 中的数据
2. 组件实例没有进行数据劫持和代理
3. 组件实例生成以后，并且已经初始化了事件和所有的钩子函数
---

- created
1. 实现数据代理、data数据的监视(setter)
2. 可以使用 methods 方法和通过 vm 读取 data 中的数据
3. 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el还不可用
4. 异步请求钩子会阻塞 ui 渲染白屏
---

- beforeMount
1. 不能通过 ref 读取页面标签对象
2. 此时 template 模板已经编译好，但还未挂载到页面上
3. 在挂载开始之前被调用相关的 render 函数首次被调用
---

- mounted
1. $el 在 mounted 可见， $el 代表的编译完所有真实 DOM 片段
2. 界面初始显示之后立即回调
3. 可以通过 ref 读取页面标签对象
4. 一般执行异步操作，发 ajax 请求 / 启动定时器 / 订阅消息 / 绑定自定义事件监听
5. 在路由参数发生改变时, 不会重新挂载, 因为组件对象没有销毁重新创建
---

- beforeUpdate
1. 看到的界面是老的界面
2. 数据发生改变，并且视图更新之前
---

- updated
1. 看到的界面新的界面
2. 异步请求会导致发送多次请求，浪费资源
---

- beforeDestory
1. 实例进入销毁状态
2. 所有的data、methods、指令、过滤器都处于可用状态
---

- destoryed
1. 销毁 vue 实例: vm.$destory()
2. 当前的组件还没有被彻底销毁
3. 在此做一些收尾的工作如: 清除定时器
4. 实例销毁仅代表 Vue 的实例被销毁，
但是页面还在
5. 只不过切断了实例数据层和页面视图层的关联
---

#### lifecycle (hide)
> 在被<keep-alive>包含的组件 / 路由中，会多出两个生命周期的钩子 activated 与 deactivated

- activated
1. 在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用
2. 第一次进入缓存路由 / 组件，在 `mounted` 后面，`beforeRouteEnter` 守卫传给 `next` 的回调函数之前
3. 因为组件被缓存了，再次进入缓存路由/组件时，不会触发前置钩子

---

- deactivated
1. 组件被停用(离开路由)时调用
2. 使用了 `keep-alive` 就不会调用 `beforeDestroy` 和 `destroyed` 因为组件没被销毁被缓存起来了

---

- errorCaptured
1. 当捕获子孙组件的错误时被调用。
2. 接收三个参数（错误对象，发生错误组件的实例，错误信息）
3. 可以返回 `false` 阻止错误向全局传播

```js
// 可以通过发生错误的组件实例，来调用组件实例身上的方法
errorCaptured(errorObj, errorVM, errorMsg){
    errorVM.test(errorVM.msg)
    // 阻止错误继续向上传播
    return false
}
```

---

#### Mustache
> js语句是做一些事件，而表达式是求出结果的，表达式是不完整的，必须和其他语法配合才能正常存在，而语句是可以独立存在的。

- v-model 双向数据绑定，本质上就是语法糖
1. `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件
2. `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件
3. `select` 字段将 `value` 作为属性并将 `change` 作为事件

```html
<input type="text" :value="value" @input="onInput">
```

- 表单修饰符
1. `v-model.lazy` 在输入框输入完内容，光标离开时才更新视图
2. `v-model.number` 自动将用户的输入值转为数值类型
3. `v-model.trim` 自动过滤用户输入的首尾空白字符

---

- v-bind 动态数据绑定
1. 对属性的简单赋值，当内存中值改变，还是会触发重新渲染
2. 绑定事件监听 `v-on:click`
3. 模板数据的来源 `data\props\computed`
4. 支持动态参数 `v-on:[eventName]="doSomething"`

- 数据绑定修饰符
1. `.sync` 内部帮我们绑定了 `update:xxx` 这样一个事件
2. `.camel` 将 `kebab-case attribute` 名转换为 `camelCase`
3. `.prop` - 作为一个 `DOM property` 绑定而不是作为 `attribute` 绑定

---

#### class-style
```html
<!--动态class对象-->
<div :class="{ 'is-active': true, 'red': isRed }"></div>

<!--动态class数组-->
<div :class="['is-active', isRed ? 'red' : '' ]"></div>

<!--动态style对象-->
<div :style="{ color: textColor, fontSize: '18px' }"></div>

<!--动态style数组-->
<div :style="[{ color: textColor, fontSize: '18px' }, { fontWeight: '300' }]"></div>
```

---

#### condition render
> 如果需要频繁的切换 v-show 较好

1. `v-if` 和 `v-else`特性删除标签进行隐藏
2. `v-show` 特性通过标签样式 `display:none` 进行隐藏
3. 通过唯一的 `key` 值来独立渲染，因为 `vue` 底层渲染时会复用元素，导致输入内容会缓存
4. `v-for`优先级要比`v-if`高，如果俩者同时使用会导致遍历的同时都要进行一次判断

#### list render
```html
<div v-for="(value,name,index) in object" :key="index">
    {{ name }}:{{ value }}
</div>
<div v-for="(item,index) of list" :key="index"></div>
```
- vue在对数组进行监视是对底层数组方法进行了重写，如果直接去进行数组赋值操作vue是检测不到数据的变化的，监视的是数组中的属性而并非是数组本身，`push pop shift unshift splice sort reverse`

```js
let vm = new Vue({
    data:{
        items:['a','b','c']
    }
})
vm.item[0] = 'x' // 不是响应性的
vm.item.length = 2 // 不是响应性的

// 解决方法
Vue.set(vm.items, indexOfItem, newValue)
vm.items.splice(indexOfItem, 1, newValue)
vm.$set(vm.items, indexOfItem, newValue)
```
- 异步更新队列，`vue`在更新`dom`渲染时是异步的，侦听到数据的变化会开启一个队列，并缓存到事件队列当中，为了待数据更新完成后可以使用`$nextTick(callback)`，待`dom`更新完毕后调用

```js
// $nextTick() 默认返回一个 Promise 对象
methods:{
    async update(){
        await this.$nextTick()
    }
}
```

---

#### event
> 事件修饰符：在绑定事件时，内部自动将传递的事件名称外封装了一层回调函数传递了`$event`参数

- `.stop` 阻止单击事件继续传播
- `.once = ~` 只显示一次，移除监听
- `.prevent` 阻止原生的默认事件
- `.capture = !` 开启外部元素捕获
- `.passive = &` 立即触发回调函数
- `.native` 绑定原生事件
- `.self` 只在`event.target`当前元素自身时触发处理函数

```html
<!--
    底层封装
    @click="($event) => {test('haha', $event)}
-->
<button @click="test('xiao')">test</button>
<button @click="test('hah', $event)">test</button>
```

>按键修饰符
- `.exact` 组合触发事件

```html
<!--也可以使用键码 13-->
<input type="text" v-model="msg" v-on:keyup.enter="test">
<!--组合键-->
<button v-on:click.ctrl.exact="click">
```

---

#### component
- 提高代码复用性，降低整个系统的耦合度，提高可维护性方便调试

```js
//参数（"组件名称","配置对象"）
Vue.component('button-counter',{
    //data必须是一个函数，返回的都是一个独立的对象
    data(){
        return{}
    }，
    //声明接收的属性
    props:[],
    //模板标签
    template：""
}
```
- 单文件组件 .vue 组件复用每个组件都会各自独立维护它的实例属性，建议书写顺序
- 组件命名方式 `kebab-case` 烤串方式、`PascalCase` 驼峰方式
- 局部注册组件需要在应用的文件中声明 `components`

```js
export default{
// 副作用 (触发组件外的影响)
    el
// 全局感知 (要求组件以外的知识)
    name
    parent
// 组件类型 (更改组件的类型)
    functional
// 模板修改器 (改变模板的编译方式)
    delimiters
    comments
// 模板依赖 (模板内使用的资源)
    components
    directives
    filters
// 组合 (向选项里合并属性)
    extends
    mixins
// 接口 (组件的接口)
// 根元素是否继承 attribute
    inheritAttrs
    model
    props / propsData
// 本地状态 (本地的响应式属性)
    data
    computed
// 事件 (通过响应式事件触发的回调)
    watch
// 生命周期钩子 (按照它们被调用的顺序)
    hook
// 非响应式的属性 (不依赖响应系统的实例属性)
    methods
// 渲染 (组件输出的声明式描述)
    template / render
    renderError
}
```

#### props
> prop 特性组件传递

- 指定名称情况声明数组形式
- 指定名称和类型对象形式，同时可以指定是否必填，默认值
- 指定自定义校验函数 `validator` 验证传递参数

#### custom
> 此方式只用于子组件向父组件发送消息，隔代通信不适用

```html
<!--父组件声明的组件元素-->
<div>
    <child @changeTitle="changeTitle" />
</div>
<!--子组件可以通过与绑定的事件监听的事件名来传递数据-->
<button v-on:click="$emit('changeTitle', data)"></button>
```
- 组件使用 `v-module` 等价于绑定值和监听
- 事件监听器在 `dom` 模板中会被自动转换为全小写，因为 `html` 是大小写不敏感的
- 分发多个事件参数时可以使用 `arguments`

```html
<div id="app">
    <blog-post @changeText="changeText(...arguments, 'article')" />
</div>
<button @click="$emit('changeText', 'red', '18px')">点击改变样式</button>
```

- 可以在父组件引用子组件时通过 `@hook` 来监听子组件的生命周期

```html
<!--Parent.vue-->
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
<!--Child.vue-->
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
<!--以上输出顺序为：-->
<!--子组件触发 mounted 钩子函数 ...-->
<!--父组件监听到 mounted 钩子函数 ... -->
```

#### slot
> 标签体内容和数据在父组件中解析好后传递给子组件

- `v-slot` 属性只能在 `<template>` 上使用，只有默认插槽时可以在组件标签上使用

- 默认插槽，一个组件只能有一个默认插槽

```html
<!-- 父组件 -->
<Child>
    <div>默认插槽</div>  
</Child>

<!-- 子组件 Child.vue -->
<template>
    <slot>
      <p>插槽后备的内容</p>
    </slot>
</template>
```

- 具名插槽，通过 `name` 属性来标识，用 `#` 代表缩写 `v-slot:`

```html
<!-- 父组件 -->
<child>
    <template v-slot:default>具名插槽</template>
    <!-- 具名插槽⽤插槽名做参数 -->
    <template #content>内容...</template>
</child>

<!-- 子组件 Child.vue -->
<template>
    <slot>插槽后备的内容</slot>
    <slot name="content">插槽后备的内容</slot>
</template>
```

- 作用域插槽，在子组件 `slot` 上绑定插槽 `prop`，通过父作用域来获取

```html
<child> 
    <!-- 把v-slot的值指定为作⽤域上下⽂对象 -->
    <template v-slot:default="slotProps">
        来⾃⼦组件数据：{{slotProps.testProps}}
    </template>
    <template #default="{testProps}">
        来⾃⼦组件数据：{{testProps}}
    </template>
</child>

<!-- 子组件 Child.vue -->
<template> 
    <slot name="footer" testProps="子组件的值">
        <h3>没传footer插槽</h3>
    </slot>
</template>
```

#### Bus
> 可以通过原型传递vm对象来实现任意组件间通信

- 利用 `$on、$emit` 并实例化一个全局 `vue` 实现数据共享
- 通常用来挂载 `api` 数据接口，`$off` 用来解绑事件

```js
// 创建一个中央时间总线类
class Bus {
  constructor() {
    this.callbacks = {};   // 存放事件的名字
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}
// main.js
Vue.prototype.$bus = new Bus() // 将 $bus 挂载到 vue 实例的原型上
// 传值组件
this.$bus.$emit('eventTarget','这是eventTarget传过来的值')
// 接收组件
this.$bus.$on("eventTarget",v => {
    // 这是eventTarget传过来的值
    console.log('eventTarget',v);
})
```

#### attrs
> 非 prop 特性

- `$attrs` 属性透传，除去 `props、class` 和 `style` 之后剩下的向子孙组件传递所有属性
- `$listeners` 事件透传，包含了父作用域中事件除去 `.native` 修饰的 `v-on` 事件监听器
- 通过设置 `inheritAttrs=false` 将非 `prop` 参数不作用在组件根元素身上

```html
<!--父组件 index.vue-->
<list @change="change" @update.native="update"></list>

<!--子组件 list.vue $listeners 会被展开-->
<detail v-on="$listeners"></detail>

<!--孙子组件 detail.vue-->
mounted() {
    this.$listeners.change()
    this.$listeners.update() // TypeError: this.$listeners.update is not a function
}
```

#### parent-children
- `$parent、$children` 访问父子组件属性和方法，但是无法扩展更深的组件上
- 如果包含异步组件，没有办法保证子组件获取的顺序问题

```js
// 类似于全局事件总线通过夫组件建立通信，实现兄弟之间通信
this.$parent.$on('click-event', msg => {
    console.log(msg)
})
this.$parent.$emit('click-event','message')

// 父组件可以通过 $children 获取子组件身上属性和方法
this.$children[0].eat()
```

#### provide-inject
- 依赖注入允许我们指定我们想要提供给后代组件的数据 / 方法
- `provide` 和 `inject` 绑定并不是可响应的，但是你可以依赖于传入一个可监听的对象

```js
provide: function () {
  return {
      // 直接返回值，不可响应
      staticValue: this.staticValue, 
      // 返回一个对象，可响应
      staticObject: this.staticObject,
      // 返回一个对象的函数，可响应
      getReactiveValue: () => this.staticValue 
    }
}
```
- 然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的 `property`

```js
export default{
    // inject: ['staticValue','staticObject','getReactiveValue'],
    inject:{
        status:{
            from: staticValue,
            default: () => [1, 2, 3]
        }
    },
    computed: {
    reactiveValue() {
    // 返回注入的对象函数，通过计算属性来监听值的变化
      return this.getReactiveValue()
    },
  },
}
```

#### refs
- 容易遗忘的一种通信方式也属于非 `prop` 特性

---

#### transition animation
- 过渡实现
> 通过vue来操作css样式与html的关联，操作class实现过渡效果

```css
/*过渡过程中*/
.show-enter-active,.show-leave-active{
    transition: opacity 1s;
}
/*进入和离开时为样式的初始化*/
.show-enter,.show-leave-to{
    opacity: 0;
}
```
```html
<transition name="show">
<!--标签内要过渡的元素-->
    <p v-show="show">hello，myworld</p>
</transition>
```

- 动画实现
> 动画都是要在执行过程中实现，使用关键帧

```css
.bounce-enter-active{
    animation: bounce-in .5s;
}
.bounce-leave-active{
    animation: bounce-in .5s reverse;
}
/*关键帧*/
@keyframes bounce-in{
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1);
    }
}
```

##### custom class
- enter-class
- enter-active-class
- enter-to-class
- leave-class
- leave-active-class
- leave-to-class

```html
<!--优先级要比普通类名高-->
<transtion
    :duration="1000" 
    :duration="{ enter: 500, leave: 800 }"
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
></transtion>
```

##### custom hooks
```html
<transition
  appear
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

##### transition modal
- in-out 新元素先进行过渡，完成之后当前元素离开
- out-in 当前元素先进行过渡，完成之后新元素过渡进入

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

##### transition list
- `v-move class` 它会在元素的改变定位的过程中应用
- 它会以一个真实元素呈现，通过 `tag` `attribute` 更换为其他元素
```html
<transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
</transition-group>
```

##### transition dynamic
```html
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```

---

#### mixins
1. 定义一个同`vm`实例对象一样的对象
2. 混入书写的结构同`vm`的结构一样
3. 使用混入： `mixins:[object]`
4. 组件内部的数据的优先级高于混入数据的优先级

```js
// 编码更加灵活
mixins-index.js
export default{
    data:...
    methods:...
}
// 组件内引入
import mixin from './...'
export default{
    mixins:[mixin]
}
```

1. 替换型策略有 `props`、`methods`、`inject`、`computed`，就是将新的同名参数替代旧的参数
2. 合并型策略是 `data`, 通过 `set` 方法进行合并和重新赋值
3. 队列型策略有生命周期函数和 `watch`，原理是将函数存入一个数组，然后正序遍历依次执行
4. 叠加型有 `component`、`directives`、`filters`，通过原型链进行层层的叠加

---

#### directive
- 当表达式的值改变时，将其产生的连带影响，响应式地作用于 `DOM`

```js
/* 
全局指令（自定义的指令名称,回调）
    el: 指令属性所在的标签元素
    binding: 包含指令相关数据的对象
*/
Vue.directive('upper-text',(el,binding) => el.textContent = binding.value.toUpperCase())

/* 
局部指令：{'自定义指令名称函数'}
    el: 指令属性所在的标签元素
    binding: 包含指令相关数据的对象
*/
directives:{
    'lower-text'(el,binding){
        el.textContent = binding.value.toLowerCase()
    }
}
/*
    配置指令
*/
Vue.directive('sticky',{
    bind,   // 元素第一次绑定调用初始化
    inserted,   // 被绑定元素插入父节点时调用
    update, // 所在组件的 VNode 更新时调用
    componentUpdated,   // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    unbind, // 只调用一次，指令与元素解绑时调用
})
```

- 栗子，只能输入正整数

```js
// 只能输入正整数,0-9的数字
Vue.directive('enterIntNumber', {
  inserted: function (el) {
    let trigger = (el, type) => {
      const e = document.createEvent('HTMLEvents')
      e.initEvent(type, true, true)
      el.dispatchEvent(e)
    }
    el.addEventListener("keyup", function (e) {
      let input = e.target;
      let reg = new RegExp('^\\d{1}\\d*$');  //正则验证是否是数字
      let correctReg = new RegExp('\\d{1}\\d*');  //正则获取是数字的部分
      let matchRes = input.value.match(reg);
      if (matchRes === null) {
        // 若不是纯数字 把纯数字部分用正则获取出来替换掉
        let correctMatchRes = input.value.match(correctReg);
        if (correctMatchRes) {
          input.value = correctMatchRes[0];
        } else {
          input.value = "";
        }
      }
      trigger(input, 'input')
    });
  }
});
```

---

#### filter
> 对要显示的数据进行特定格式化的处理后再显示，没有改变原数据，是产生新的对应数据

```html
<!--初始时间 ‘管道符’ 格式后的时间-->
<p>格式化时间{{startTime | dateFormat}}</p>
```
```js
//创建 Vue 实例之前全局定义过滤器
Vue.filter('dateFormat',(value,formatStr='YYYY-MM-DD HH:mm:ss') 
=> moment(value).format(formatStr))
```

---

#### plugins
> 声明使用vue插件，内部会自动调用plugin的install方法来安装插件

```js
Vue.use(plugin)
//定义一个插件对象
const plugin = {}
//插件对象身上要有一个install方法
plugin.install = function(Vue,options){
    //给Vue添加工具/静态方法
}
//添加全局指令
Vue.directive()
//添加一个实例的方法
Vue.prototype.xxx = function(){}
//暴漏插件
```

---

#### module css
- 通过定义样式模块采用变量形式进行访问类名

```html
<template>
    <div :class="['list-class',$style.red]"></div>
</template>
<style module>
    .red{
        color:red
    }
</style>
```

---