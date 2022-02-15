/**
 * variate 变量命名规范
 * 1. 变量名称必须仅包含字母，数字，符号 $ 和 _。
 * 2. 首字符必须非数字，无法使用保留字命名。
 * 
 */
var a = 'aa';
var _ = null;


/**
 * 严格模式
 * 1. 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为
 * 2. 消除代码运行的一些不安全之处，保证代码运行的安全
 * 3. 提高编译器效率，增加运行速度
 * 4. 为未来新版本的 Javascript 做好铺垫
 * 
 */
'use strict';


/**
 * let const 
 * 1. 在块作用域内有效
 * 2. 不能重复声明，不会预处理, 不存在变量提升
 * 3. const 声明变量的值不能改变
 * 4. let 声明变量只能在块级作用域里访问，有暂时性死区的特性
 * 
 */
let list = [];
const obj = {}; // 地址值无法变更


/**
 * 基本数据类型
 * number 用于任何类型的数字：整数或浮点数，在 ±(253-1) 范围内的整数。
 * bigint 用于任意长度的整数。
 * string 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
 * boolean 用于 true 和 false。
 * null 用于未知的值 —— 只有一个 null 值的独立类型。
 * undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型。
 * symbol 用于给对象的 key 添加唯一的标识符。
 * object 用于更复杂的数据结构。
 * 
 */

Number; Boolean; String; bigint; null; undefined; Symbol; Object;
// 为什么基本数据类型 number、boolean、string 字面量创建的数据能够直接调用引用类型的方法？
// 因为 number、boolean、string 在调用方法时会在内部创建一个包装对象，方法结束时会立即销毁；
var str = 'hello'
str.number = 10; // 包装成Number实例对象
{
// 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
    var str = new String('hello')
// 2 通过这个对象调用包装对象下的方法 但结果并没有被任何东西保存
    str.number = 10
// 3 这个对象又被销毁
    str =null
}
alert(str.number) // undefined

// typeof 能判断哪几种数据类型
typeof '123' // string
typeof 123 // number
typeof false // boolean
typeof null // object
typeof undefined // undefined
typeof Symbol('AA') // symbol
typeof function (){} // function
typeof [] // object
typeof {} // object


/**
 * 运算符
 * 自增自减 ( ++ -- )
 * 按位与 ( & )
 * 按位或 ( | )
 * 按位异或 ( ^ )
 * 按位非 ~n 等于 -(n-1)
 * 左移 ( << )
 * 右移 ( >> )
 * 无符号右移 ( >>> )
 * 条件运算 ( > < >= <= != === !== )
 * 逗号运算 ( , )
 * 逻辑运算 ( && || ! )
 * 三目运算 ( ? : )
 * 可选链操作符 ( ?. )
 * 
 */


/**
 * 流程分支语句
 * 单分支：if(){}
 * 多分支：if(){}else(){}、switch(x){}case
 * 
 */
let x = '123'
switch(x) {
    case 'value1': 
      // ...
      break
  
    case 'value2':
      // ...
      break
  
    default:
      // ...
      break
}

// Break 有俩个作用，在 switch 当中跳出 switch 语句，for 循环当中跳出离它最近的一层循环
// continue 执行下一次计数循环 i++


/**
 * for 循环语句
 * while 循环语句
 * 
 */
var i = 100;
while(i < 100){
    console.log(i);
    i++;
}

var i = 100;
do{
    console.log(i);
    i++;
}while(i < 100);


/**
 * 数据类型转换
 * 假值 ( +-0 '' null undefined NaN false)
 * 只有三种基本类型转换：
 * 1. 转换成数字
 * 2. 转换成布尔值
 * 3. 转换成字符串
 * 
 */

// => number
+'1' // 1
+'a' // NaN
+[] // 0
+[1,2] // NaN
+null // 0
+{} // NaN
+Symbol('A') // TypeError

// => string
String(5) // '5'
String(true) // 'true'
String(function(){}) // 'function(){}'
String(Symbol('A')) // 'Symbol(A)'
String([1,2]) // '1,2'
String({}) // [object Object]

// => boolean
!!1 // true
!!NaN // false
!!0 // false
!!'' // false
!!undefined // false
!!null // false
!![] // true
!!{} // true


/**
 * 对象类型转基本数据类型调用自身[ToPrimitive]函数
 * 1. 是否已经是原始类型，是则直接返回
 * 2. 调用valueOf()，如果转换为原始类型，则返回
 * 3. 调用toString()，如果转换为原始类型，则返回
 * 4. 也可以重写Symbol.toPrimitive()方法，优先级别最高
 * 5. 如果都没有返回原始类型，会报错
 * 
 */
var obj = {
    value: 0,
    valueOf() {
      return 1;
    },
    toString() {
      return '2'
    },
    [Symbol.toPrimitive]() {
      return 3
    }
}
console.log(obj + 1); // 输出4


// 如何实现 a == 1 && a == 2 && a == 3
let a = {
    value: 0,
    valueOf(){
        this.value++
        return this.value
    }
}

