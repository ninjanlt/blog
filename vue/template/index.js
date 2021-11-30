/**
 * 模板编译：
 *  通常我们在 <template></template> 中编写的除了 HTML 元素以外还会使用 vue 的指令，模板语法等
 *  通过 render 渲染函数帮助我们进行渲染对应的结构
 *
 * 流程：
 *  template 中所编写的代码最终都是字符串，通过 AST 抽象语法树对字符串进行处理生成 render 函数
 *  1、模板编译阶段：将一堆字符串进行正则匹配生成 AST 语法树
 *  2、优化阶段：遍历 AST 找出静态节点进行标记
 *  3、生成阶段：将 AST 语法树生成 render 函数
 *
 */

// 源码位置: /src/complier/index.js
export const createCompiler = createCompilerCreator(function baseCompile(
    template,
    options
) {
    // 解析器：用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
    const ast = parse(template.trim(), options)
    if (options.optimize !== false) {
        // 优化器：遍历AST，找出其中的静态节点，并打上标记，优化了 DOM-diff 算法；
        optimize(ast, options)
    }
    // 生成器：将AST转换成渲染函数；
    const code = generate(ast, options)
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
})