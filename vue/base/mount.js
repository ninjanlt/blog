/**
 * vue 挂载函数 $mount
 */

// 源码位置：src/complier/to-function.js
export function createCompileToFunctionFn(compile) {
    return function compileToFunctions() {
        // compile
        const res = {}
        const compiled = compile(template, options)
        // 通过 createFunction 函数将 render 函数字符串转换真正的渲染函数
        res.render = createFunction(compiled.render, fnGenErrors)
        res.staticRenderFns = compiled.staticRenderFns.map(code => {
            return createFunction(code, fnGenErrors)
        })
        return res
    }
}
function createFunction(code, errors) {
    try {
        return new Function(code)
    } catch (err) {
        errors.push({ err, code })
        return noop
    }
}
function compile(template, options) {
    // 最开始调用的 compileToFunctions 函数内部调用了 compile 函数
    // 而在此 baseCompile 函数已经帮助我们生成了 render 函数字符串
    const compiled = baseCompile(template, finalOptions)
    compiled.errors = errors
    compiled.tips = tips
    return compiled
}

// 源码位置：src/complier/create-compiler.js
export function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
        function compile() {

        }
        return {
            compile,
            compileToFunctions: createCompileToFunctionFn(compile)
        }
    }
}

// 源码位置：src/complier/index.js
export const createCompiler = createCompilerCreator(function baseCompile(
    template,
    options
) {
    // 模板解析阶段：用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
    const ast = parse(template.trim(), options)
    if (options.optimize !== false) {
        // 优化阶段：遍历AST，找出其中的静态节点，并打上标记；
        optimize(ast, options)
    }
    // 代码生成阶段：将AST转换成渲染函数；
    const code = generate(ast, options)
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
})

const { compile, compileToFunctions } = createCompiler(baseOptions)

Vue.prototype.$mount = function (el) {
    const options = this.$options
    // 如果用户没有手写render函数
    if (!options.render) {
        // 获取模板，先尝试获取内部模板，如果获取不到则获取外部模板
        let template = options.template
        if (template) {

        } else {
            template = getOuterHTML(el)
        }
        // 核心部分
        const { render, staticRenderFns } = compileToFunctions(template, {
            shouldDecodeNewlines,
            shouldDecodeNewlinesForHref,
            delimiters: options.delimiters,
            comments: options.comments
        }, this)
        options.render = render
        options.staticRenderFns = staticRenderFns
    }
}