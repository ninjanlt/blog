#### 调试环境搭建

1. 第一步：下载 [vue3](https://github.com/vuejs/core)；
2. 第二步：全局下载 `npm install pnpm -g` 支持 `node 12.17+`；
3. 第三步：进入 `vue-core` 项目更改 `package.json` 中 `dev` 脚本 => `"dev": "node scripts/dev.js --sourcemap"`；
4. 第四步：运行打包命令 `pnpm run dev` 查看目录 `packages/vue/dist` 文件，如果有打包后的文件，代表运行命令成功；
5. 第五步：找到 `packages/vue/examples/composition` 目录选择你中意的 `html` 运行，开始 `debugger` 之旅吧；

---

#### 整体结构

- vue 核心入口包
    - runtime-dom 扩展浏览器平台
        - runtime-core 通用代码
    - compiler-dom 
    - reactivity

---

#### 初始化流程

- 主线
    1. 实例创建过程 `createApp`
    2. 挂载的过程 `app.mount()`

- 提出问题
    1. 渲染器是什么？
        - 一个对象
            - render
            - hydrate
            - createApp
        - 首次渲染
        - 获取应用程序实例
    2. 挂载做了什么事情？
        - 初始化，只执行一次
        - 建立更新机制

