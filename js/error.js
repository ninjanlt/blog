// ReferenceError 引用的变量不存在
console.log(a);


// TypeError 数据类型不正确的错误
let b = null;
console.log(b.a);


/**
 * RangeError 数据值不在其所允许的范围内
 * 1. 数组长度为负数或超长
 * 2. 数字类型的方法参数超出预定义范围
 * 3. 函数堆栈调用超过最大值
 */
function dome() {
    dome();
}
dome();


// SyntaxError 语法错误
const a = ';
console.log(a);


// throw Error 抛出错误
function getTime() {
    const time = Date.now();
    if(time%2 === 1){
        console.log('奇数'+time);
    }else{
        throw new Error('偶数？'+time);
    }
}
getTime();


// try catch 捕获错误
try {
    lalala; // error, variable is not defined!
} catch(err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // lalala is not defined
    console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
  
    // 也可以将一个 error 作为整体显示出来as a whole
    // Error 信息被转换为像 "name: message" 这样的字符串
    console.log(err); // ReferenceError: lalala is not defined
} finally{
    // 总是会执行的代码
}