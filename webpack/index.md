#### webpack
`webpack` 用来将静态资源打包器，当 `webpack` 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序所需要的模块，然后将这些模块打包成一个或多个 `bundle`，前端的所有资源文件 `js\json\css\img\less...` 都会作为模块处理。

---

#### 核心

- `Entry` 入口以哪个文件作为起点开始打包，分析构建内部依赖图
- `Output` 输出打包后的资源输出到哪里，以及如何命名
- `Loader` 模块加载器，解析非 `js\json` 文件供 `webpack` 使用
- `Plugin` 插件，在 `Webpack` 构建流程中的特定时机插入具有特定功能的代码
- `mode` 相应的模式 `production\development`

```bash
npm init -y
npm install webpack webpack-cli -D
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

#### bundle

- bundle 是由 `webpack` 打包出来的文件
- chunk 一个 `chunk` 由多个模块组成，用于代码合并和分割
- module 开发中的单模块，一个模块对应一个文件，`webpack` 会从配置 `entry` 中递归查找出所有依赖的模块

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

