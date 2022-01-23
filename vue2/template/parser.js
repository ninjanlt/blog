/**
 * 解析器：
 *  除了编写 HTML 元素，还要进行文本的填写以及对于文本的过滤器
 *  vue 在处理 template 时分为，解析器和文本过滤器两种对 template 进行解析
 * 
 */

// 代码位置：/src/complier/parser/index.js
export function parse(template, options) {
    parseHTML(template, {
        warn,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
        shouldKeepComment: options.comments,
        // 解析开始
        start(tag, attrs, unary) {
            // 当解析到标签的开始位置时，触发 start 函数
            let element = createASTElement(tag, attrs, currentParent)
        },
        // 解析结束
        end() {
            // 当解析到结束标签时调用 end 函数
        },
        // 解析到文本时
        chars(text) {
            // 判断 text 是否为动态文本
            if (text) {
                let element = {
                    type: 2,
                    expression: res.expression,
                    tokens: res.tokens,
                    text
                }
            } else {
                let element = {
                    type: 3,
                    text
                }
            }
        },
        // 解析到注释时
        comment(text) {
            let element = {
                type: 3,
                text,
                isComment: true
            }
        }
    })
    return root
}


// 游标，防止重复解析 HTML
function advance(n) {
    index += n   // index为解析游标
    html = html.substring(n)
}

// 创建对应 AST 标签元素
export function createASTElement(tag, attrs, parent) {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent,
        children: []
    }
}