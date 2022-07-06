
#### 版本环境
- `node @12.16.1`
- `webpack @4.44.2`
- `webpack-cli @3.3.12`

---

#### webpack
- `webpack` 是静态资源打包器，它基于 `node` 对文件操作的能力，将非 `js json` 文件处理成对应的 `js` 文件模块。
- 当 `webpack` 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序所需要的模块，然后将这些模块打包成一个或多个 `bundle`，前端的所有资源文件 `js\json\css\img\less...` 都会作为模块处理。

```bash
npm init -y
npm install webpack webpack-cli -D
```

---

#### 核心

- `entry` 根据入口文件递归去寻找依赖，每个依赖都将被 `webpack` 处理，最后打包到集合文件中

```js
module.exports = {
    entry: './index.js', // 工程单个入口
    // 多个入口
    entry: {
        pageA: './pageA.js',
        pageB: './pageB.js'
    }
};
```

- `output` 配置打包输出的位置、文件名等

```js
module.exports = {
    output: {
        // 占位符 [name] 为 chunkName
        filename: '[name].js',
        // 系统绝对路径
        // 如果使用 html 插件，webpack 会智能的判断生成的 html 与 chunk 的相对路径，再以 script 形式引入
        path: __dirname + '/dist',
        // 静态资源路径
        publicPath: 'https://cdn.antfin.com'
    }
};
```

- `module` 我们知道 `webpack` 是一个模块打包器，不仅能处理 `js/css/png*/es6/ts` 都通过 `loader` 处理
    - `loader` 模块加载器，通过它解析非 `js\json` 任意类型的文件，通过不同的 `loader` 做不同文件处理

```js
module.exports = {
    module:{
        // rules 当中的每一项 rule 配置了如何去处理一个模块
        rules:[
            // 例如我们希望 ES6 转 ES5 代码
            {
                test: '/\.(js)$/',
                use: 'babel-loader'
                // 作为 loader 可能有时也需要一些额外的配置
                // ps: babel的配置我们更多是以 .babelrc 配置文件的方式存在项目根目录
                options: {
                    presets: ['@babel/preset-env']
                },
                // 提高构建性能，通过配置 exclude include 过滤 node_modules 中文件
                exclude: path.resolve(process.cwd(), './node_modules'),
                include: path.resolve(process.cwd(), './src')
            },
            // 一个模块文件需要转化多次，需要多个 loader 配合
            // 例如 css 文件，先通过 css-loader 解释 @import 和 url() 语法
            // 然后通过 style-loader 将 css 文件插入至 dom 中
            {
                test: '\.(css|scss)$',
                use: [
                    'style-loader',
                    // 单个 loader 增强配置
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true, // 启用sourceMap
                        }
                    }
                ]
            }
        ]
    }
}
```

- `plugin` 在 `Webpack` 构建流程中的特定时机插入具有特定功能的代码来改变构造结果
- `mode` 指定目标环境 `production\development\none`，同时默认设置 `process.env.NODE_ENV` 环境变量
- `resolve` 配置项决定如何解析模块，是否需要缓存此模块，是否自动识别扩展文件名等。

```js
module.exports = {
    resolve:{
        alies:{
            '#': path.resolve(process.cwd(), './src'),
        }
    }
}
```

---

#### 你需要知道的
- `node-sass` 安装需要使用淘宝镜像路径 `npm install sass-loader node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ -D`
- `postcss` 项目中我们需要 `webpack` 帮助我们加上 `css` 样式兼容性前缀，实际是通过 `autoprefixer` 插件，但它本身又依赖于 `postcss`
- `babel` 默认会帮助我们转换 `ES6+` 语法，并不会转换 `ES6+` 特性，`ES6+` 特性需要预设包做支撑
- `@babel/core` 核心库，所有的 `api` 都在这里，这些 `api` 可供 `babel-loader` 去调用
- `@babel/preset-env` 预设插件包，`babel` 也是通过各种插件来规定 `ES6 => ES5` 的翻译规则
- `@babel/polyfill` 弥补浏览器缺失的一些新特性，如内置对象 `Promise` 等（注：`babel@7.4` 将此包废弃）
- `core-js` 它是 `js` 新标准的补充库，它可以实现按需加载，使用 `@babel/preset-env` 可以配置 `core-js` 的引入方式和版本（注：`@babel/polyfill` 依赖 `core-js`）
- `regenerator-runtime` 提供 `generator` 函数的转码
- `browserslist` 声明浏览器的兼容合集，可以在 `package.json` 文件中配置，也可以通过 `.browserslistrc` 单文件配置
- `chunk` 为代码块，一个 `chunk` 可能由多个模块组合而成，用于代码合并和分割，如果不做任何拆包处理，那么每一个 `entry` 就会输出一个 `chunk`，其中占位符代表了 `chunk` 的一些属性，如 `[id] = chunkId`，`[chunkhash] = chunk` 文件哈希值。
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

#### 必备 loader

- `babel-loader` 把 `ES6` 转换成 `ES5`
- `css` 相关 `loader`
    - `sass-loader` 预处理
    - `postcss-loader` css压缩、合并、自动兼容浏览器
    - `css-loader` 解释 css 文件内的 `@import` 和 `url()`
    - `style-loader` 将 css 以 `<style>` 标签插入 dom 中
- `file-loader` 打包资源图片，修复图片引入路径，修改输出后文件的路径与文件名、携带 hash 值等功能
- `url-loader` 与 `file-loader` 功能相同，在它基础上可以设置 limit 配置意味文件大小，当文件超出时会转化 base64 的数据

---

#### 必备 plugins

- `html-webpack-plugin` 根据模板自动生成 `html` 文件，并自动引用 `css` 和 `js` 文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
        })
    ]
}
```

- `mini-css-extract-plugin` 抽离 css 文件提取到单独的⽂件中，⽀持按需加载

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            fileName: '[name].css' // 生产环境需要hash可配置为 [name].[contenthash].css
       })
    ],
    modules: {
        rules: [
            test: /\.css$/,
            use: [
                // 如果引入此插件，需要将它替换 style-loader
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        ]
    }
}
```

- `uglifyjs-webpack-plugin` 代码压缩、混淆、tree-shaking的 webpack 已内置
- `HotModuleReplacementPlugin` 热更新，不刷新浏览器将新模块替换旧模块
- `DefinePlugin` 编译时配置全局变量，区分开发模式和生产模式的构建
- `extract-text-webpack-plugin` 将 `js` 文件中引用的样式单独抽离成 `css` 文件
- `happypack` 通过多进程模型，来加速代码构建
- `clean-webpack-plugin` 清理每次打包下没有使用的文件
- `ProvidePlugin` 自动加载模块，代替 `require` 和 `import`
- `compression-webpack-plugin` 生产环境可采用 `gzip` 压缩 `js` 和 `css`
- `commons-chunk-plugin` 抽离多个入口 chunk 内的公共代码
- `webpack-bundle-analyzer` 提供可视化的界面，以用来分析 webpack 构建后的打包情况

---

#### 开发配置

- `devServer` 主要就是启动了一个静态服务，使开发者方便预览自己构建的项目，配置项也是围绕服务器

```js
module.exports = {
    devServer: {
        port: 8081,
        // 如想通过手机访问页面 0.0.0.0
        host: 'localhost',
        // 静态服务器的内容目录地址
        // 访问 http://localhost:8080 则会访问工程目录下的 dist 文件夹
        contentBase: path.join(__dirname, 'dist'),
        // 配置完 contentBase 会自动加载设置的内部目录下的 index.html 文件
        // 但是主页文件是 home.html
        index: 'home.html',
        // 热更新
        hot: true,
    }
}
```

---

#### 构建配置

- `optimization` 构建优化配置项

```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    optimization: {
        // 配置执行代码压缩的工具
        minimizer: [
            new UglifyJsPlugin({
            cache: true,
            parallel: true, // 多进程压缩
            sourceMap: true
        }),
        // 优化压缩css
        new OptimizeCSSAssetsPlugin({}),
        // SplitChunkPlugin
        // 1. 把不同页面公共的代码抽离到一个 commonChunk
        // 2. 把外部依赖包单独抽离到一个 vendor
        // 3. 把React/Vue 等项目必引的库单独抽离成 dll
        splitChunks: {
            // name 分离出的chunk名字，默认为true，chunkname会自动生成
            // maxInitialRequests 最大可分割出来的chunk数
            // maxAsyncRequests 最大可分割出来的异步chunk数（按需加载时使用）
            cacheGroups: {
                // 分割代码的核心配置
                // name 分离出的chunk的名字，如果未设置且外层name:true，以chunk的key为name
                // minChunks 抽离公共代码时，该公共代码最少被几个chunk引用了
                // test 模块匹配规则
                // priority 分离规则优先级
            }
        },
        // 为了控制模块的依赖与加载
        runtimeChunk: { name: 'manifest' }
    ],
  }
}
```


---

#### 构建流程

1. 初始化参数，从 `webpack.config.js` 配置文件和 `shell` 语句中读取合并参数
2. 准备编译，通过调用 `webpack()` 返回的 `compiler` 方法，创建 `compiler` 对象加载 `webpack plugin`
3. 确认入口，根据配置中 `entry` 入口文件，执行对象 `compiler.run()` 方法开始编译
4. 编译模板，从入口文件出发，调用匹配的 `loader` 对模块文件进行递归翻译
5. 完成编译，翻译完毕后得到模块之间相互依赖关系
6. 输出文件，确定好输出内容后根据 `output` 确定输出路径和文件名，把内容文件写入文件系统

---

