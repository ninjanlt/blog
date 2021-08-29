// match(regexp) 匹配正则表达式的结果
// matchAll(regexp) 获取匹配结果的迭代数组
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp); // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']

// padStart(targetLength[, padString]) 头部填充字符串
// padEnd(targetLength[, padString]) 尾部填充字符串
// charAt 获取指定位置的字符，可以通过下标直接获取
// includes 判断字符中是否包含另一个字串
str.includes(searchString,index)
alert( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
alert( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束


// indexOf 查找字符串
// 默认从0位置开始查找'2'，第二个参数可以指定从哪开始
var str="Hello world!"
console.log(str.indexOf("Hello",0)) // 0
console.log(str.indexOf("World")) // -1
console.log(str.indexOf("world")) // 6

// replace(regexp|substr, newSubStr|function) 替换子串
let str = 'hello lxm'
str.replace('hello','haha')

// slice(start [, end]) 提取字串，含头不含尾
let str = 'hellow lxm'
str.slice(0,-1)

// split 以指定间隔字符转换为数组
var str="abc def ghi jkl" 
console.log(str.split(' ')) // ["abc", "def", "ghi", "jkl"]
console.log(str.split(''))
console.log(str.split(' ',3)) // ["abc", "def", "ghi"]

// search(regExp) 搜索指定字符
let str = 'Hellow lxm'
console.log(str.search('lxm')) // 7
console.log(str.search('Lxm')) // -1

// substr substring 提取指定字符，允许 substr(start) 为负数，substring 负数为 0
let str = 'hellow lxm'
console.log(str.substr(2, 4)) // llow
console.log(str.substring(2, str.length-1)) // llow lx