
#### 版本环境
- `node @12.16.1`
- `webpack @4.44.2`
- `webpack-cli @3.3.12`

---

#### webpack
- `webpack` 是静态资源打包器，它基于 `node` 对文件操作的能力，将非 `js json` 文件处理成对应的 `js` 文件模块。
- 当 `webpack` 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序所需要的模块，然后将这些模块打包成一个或多个 `bundle`，前端的所有资源文件 `js\json\css\img\less...` 都会作为模块处理。

---

#### 核心

- `Entry` 根据入口文件递归去寻找依赖，每个依赖都将被 `webpack` 处理，最后打包到集合文件中
- `Output` 配置打包输出的位置、文件名等
- `Loader` 模块加载器，通过它解析非 `js\json` 任意类型的文件
- `Plugin` 在 `Webpack` 构建流程中的特定时机插入具有特定功能的代码来改变构造结果
- `mode` 指定目标环境 `production\development`

```bash
npm init -y
npm install webpack webpack-cli -D
```

---

#### 你需要的
- `postcss` 项目中我们需要 `webpack` 帮助我们加上 `css` 样式兼容性前缀，实际是通过 `autoprefixer` 插件，但它本身又依赖于 `postcss`
- `babel` 默认会帮助我们转换 `ES6+` 语法，并不会转换 `ES6+` 特性，`ES6+` 特性需要预设包做支撑
- `@babel/core` 核心库，所有的 `api` 都在这里，这些 `api` 可供 `babel-loader` 去调用
- `@babel/preset-env` 预设插件包，`babel` 也是通过各种插件来规定 `ES6 => ES5` 的翻译规则
- `@babel/polyfill` 弥补浏览器缺失的一些新特性，如内置对象 `Promise` 等（注：`babel@7.4` 将此包废弃）
- `core-js` 它是 `js` 新标准的补充库，它可以实现按需加载，使用 `@babel/preset-env` 可以配置 `core-js` 的引入方式和版本（注：`@babel/polyfill` 依赖 `core-js`）
- `regenerator-runtime` 提供 `generator` 函数的转码
- `browserslist` 声明浏览器的兼容合集，可以在 `package.json` 文件中配置，也可以通过 `.browserslistrc` 单文件配置
- `chunk` 代码块一个 `chunk` 可能由多个模块组合而成，用于代码合并和分割（合并分割采用指纹策略，指纹策略是指文件后的 `hash` 标识）
- `chunks` 多个 `chunk` 的集合
- `bundle` 资源经过 `webpack` 流程解析编译最终输出的一个 `js` 文件

```js
// index.js
import { a } from 'a.js'
console.log('我是index文件')

// a.js
const a = '我是a文件'
export { a }

// 上面代码来说，a.js 就是 chunk，而 index.js 就是 chunks
// 在 webpack 构建中入口是 chunks，出口是 chunk
```

---

#### loader

- `file-loader` 把⽂件输出到⼀个⽂件夹中，在代码中通过相对 `URL` 去引⽤输出的⽂件
- `url-loader` 和 `file-loader` 类似，但是能在⽂件很⼩的情况下以 `base64` 的⽅式把⽂件内容注⼊到代码中去
- `source-map-loader` 加载额外的 `Source Map` ⽂件，以⽅便断点调试
- `image-loader` 加载并且压缩图⽚⽂件
- `babel-loader` 把 `ES6` 转换成 `ES5`
- `css-loader` 加载 `CSS`，⽀持模块化、压缩、⽂件导⼊等特性
- `style-loader` 把 `CSS` 代码注⼊到 `JavaScript` 中，通过 `DOM` 操作去加载 `CSS`
- `eslint-loader` 通过 `ESLint` 检查 `JavaScript` 代码

---

#### plugins

- `html-webpack-plugin` 根据模板自动生成 `html` 代码，并自动引用 `css` 和 `js` 文件
- `mini-css-extract-plugin`，`CSS` 提取到单独的⽂件中，⽀持按需加载
- `DefinePlugin` 编译时配置全局变量，区分开发模式和生产模式的构建
- `extract-text-webpack-plugin` 将 `js` 文件中引用的样式单独抽离成 `css` 文件
- `HotModuleReplacementPlugin` 热更新，不刷新浏览器将新模块替换旧模块
- `happypack` 通过多进程模型，来加速代码构建
- `clean-webpack-plugin` 清理每次打包下没有使用的文件
- `ProvidePlugin` 自动加载模块，代替 `require` 和 `import`
- `compression-webpack-plugin` 生产环境可采用 `gzip` 压缩 `js` 和 `css`

---

#### 构建流程

1. 初始化参数，从配置文件和 `shell` 语句中读取合并参数
2. 开始编译，通过参数初始化得到 `Compiler` 对象，加载所有配置插件，执行对象 `run` 方法开始编译
3. 确认入口，根据配置中 `entry` 找到所有的入口文件
4. 编译模板，从入口文件出发，调用所有配置的 `loader` 对模块进行递归翻译
5. 完成编译模板，通过对所有的 `loader` 翻译完毕后得到它们之间的依赖关系
6. 输出资源，根据入口和模块之间的依赖关系，组成包含多个模块的 `chunk` 再把每个 `chunk` 转换成一个单独的文件加入到输出列表
7. 输出完成，确定好输出内容后根据配置确定输出路径和文件名，把内容文件写入文件系统

---

