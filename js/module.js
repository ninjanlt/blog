/**
 * 模块化，防止命名空间的污染，利于维护
 * CJS
 * AMD
 * CMD
 * ES6
 * 
 */

// IIFE 匿名函数自调用
(function(w, test){
    var data = {name:'xxx'};
    function demo() {
        console.log(data);
        test();
    }
    w.demo = demo;
})(window, test);


/**
 * commonJs node模块系统就是参照 commonjs 规范实现
 * 全局性方法 require()，用于加载模块，但是不能进行异步加载
 * 1. module.exports 可以暴露任意数据
 * 2. 可以使用 module.exports 暴露多个数据	module.exports.name = name;
 * 3. exports 也可以暴露数据，不过不能使用 exports = xxx 的形式
 * 
 */
// 定义模块 demo.js
var num1 = 0;
function add(a, b) {
  return a + b;
}

// 暴露向外提供的函数或者变量
module.exports = {
  add: add,
  num1: num1,
}

// 导入自定义的模块时，参数包含路径，可省略.js
const moduleA = require('./demo');
moduleA.add(2, 1); // 3

// 在 node 中，引用其核心模块，则不需要带路径
var fs = require('fs');
var data = fs.readFileSync('./demo.js');


/**
 * AMD 采用异步方式加载模块，模块的加载不影响它后面语句的运行，最具代表性的实现是 require.js
 * AMD 也采用 require() 语句加载模块，但是不同于 CommonJS，俩个参数
 * 
 */
require([module], callback);
require(['math'], function (math) {
    math.add(2, 3);
});


/**
 * CMD 用于浏览器端，模块加载是异步的，模块使用时才会进行加载
 * 它整合了 CommonJS 和 AMD 的特点最具有代表性的是 sea.js
 * 
 */
// 没有依赖的模块
define(function(require,exports,module){
    exports.xxx = value
    module.exports = value
})
// 含有依赖的模块
define(function(require,exports,module){
    // 同步
    var module = require('./module')
    // 异步
    require.async('./module1',function(m3){})
    // 暴露模块
    exports.xxx = value
})
// 引入使用模块
define(function(require){
    var m1 = require('./module1')
    var m2 = require('./module2')
    m1.show()
    m2.show()
})


/**
 * ES6
 * import(module) 表达式，默认返回一个 Promise 对象，resolve 包含其导出模块对象
 * require() 是运行时加载，后面的代码必须等待这个命令执行完，才会执行
 * import 命令则是编译时加载
 * 
 */

// 分别暴露形式 export
export var height = 180;
export function run(){
    console.log('run');
}

// 统一暴露形式 exprot{}
var title = '欧阳娜娜';
function rand(m,n) {
    return Math.ceil(Math.random()*(n-m+1))+m-1;
}
export { title, rand };

// 默认暴露形式 export default
var brand = 'iphone';
function call() {
    console.log('with sb to do sth');
    return '喂'
}
export default { band, call };

// 全部导入 import * as <obj>
// result.js
export let result = [1,2,3]
export function main(){}
// test.js
import * as test from './result.js'

// 分别引入 import {} from ...
// result.js
export let result = [1,2,3]
export function main(){}
export Class Person{}
// test.js
import {result, main, Person} from './result.js'

// 默认暴露 export default
// result.js
export default function main(){}
// test.js
import main from './result.js'

