/**
 * 字符串实例对象方法中具备正则匹配的：match、search、replace、split
 * 正则实例具备方法：test、exec
 * 
 */

let str = "I love JavaScript!"; // 将在这里搜索
let regexp = /love/;
alert( str.search(regexp) ); // 2


/**
 * 五种修饰符
 * i 不区分大小写
 * g 查找所有的匹配项
 * m 多行模式
 * u 开启 unicode 支持
 * y 粘滞模式
 * 
 */

// 如果没有标志 g 正则表达式仅查找第一个匹配项，即第一个匹配的数字
let str = "+7(903)-123-45-67";
let regexp = /\d/g;
// ["7", "9", "0", "3", "1", "2", "3", "4", "5", "6", "7"]
console.log( str.match(regexp) ); 


/**
 * \d 数字字符从 0 到 9 等同于 [0-9]
 * \s 空白符
 * \t 制表符
 * \n 换行符
 * \w 拉丁字母或数字或下划线，单词字符
 * \D 非数字
 * \S 非空白符
 * \W 非单词字符
 * . 匹配任意字符除了 \n 换行符
 * 
 */


/**
 * 锚点符号
 * ^ 匹配文本开头
 * $ 匹配文本结尾
 * \b 是否以单词为边界位
 * [ \ ^ $ . | ? * + () 特殊字符需要对其转义
 * 
 */
let str = 'Breakfast at 09:00 in the room 123:456.'
let regexp = /\b\d\d:\d\d\b/gi;
console.log( str.match(regexp) ); // ["09:00"]


 /**
  * [...] 匹配范围中的几个字符或者字符类意味着 “搜索给定的字符中的任意一个”
  * 方括号也可以包含字符范围，使用 - 标识连字符
  * [^...] 的排除方括号范围匹配，[...] 内可以不需要转义
  * 
  */
"Voila".match(/V[oi]la/) // Vola、Vila
"Exception 0xAF".match(/[a-z0-9]/ig)
"alice15@gmail.com".match(/[^\d\sA-Z]/gi) // ['@','.']
"Breakfast at 09:00. Dinner at 21-30".match(/\d+[^\w\s.]\d+/g) // ['09:00','21-30']


/**
 * 贪婪模式，量词会尽可能的重复多次，一次性匹配到底再进行回溯
 * (正则表达式通常的行为是匹配尽可能多的字符
 * 比如这个表达式：a.*b，它将会匹配最长的以 a 开始，以 b 结束的字符串
 * 如果用它来搜索 aabab 的话，它会匹配整个字符串 aabab)
 * 
 */

/**
 * 懒惰模式，重复最少的次数，在量词后添加 ? 来启用，引擎会尝试去匹配模式的剩余部分
 * (就是匹配尽可能少的字符，在能使整个匹配成功的前提下使用最少的重复
 * 只要在它后面加上一个问号?即可
 * 例如 a.*?b 匹配最短的，以 a 开始，以 b 结束的字符串
 * 如果把它应用于 aabab 的话，它会匹配 aab 和 ab)
 * 
 */
let reg = /".+"/g,
    regexp = /".+?"/g
console.log('a "witch" and her "broom" is one'.match(reg))


/**
 * {n} 字符后跟一个量词，获取确切的位数，可以限定匹配的数量
 * {3,5} 某个范围的位数，\d{3,} 查找位数大于或等于 3 的数字
 * 
 */
"I'm 12345 years old".match(/\d{5}/) // '12345'
"I'm not 12, but 1234 years old".match(/\d{3,5}/) // 1234


/**
 * + 它会匹配一次及以上的字符 {1,}
 * ? 它前面的字符需要出现 0 次或 1 次 {0,1}
 * * 它会匹配 0 个或多个字符 {0,}
 * | 或
 * 
 */
let reg = /#[a-f0-9]{6}\b/ig
`color:#121212; 
background-color:#AA00ef 
bad-colors:f#fddee #fd2 #12345678`.match(reg) // ['#121212','#AA00ef']


// (...) 捕获组
let reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g
'my@mail.com @ his@site.com.uk'.match(reg) // my@mail.com, his@site.com.uk
RegExp.$1
RegExp.$_

// ?<name> 命名组
let reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2}-(?<day>[0-9]{2})/g
let str = '2020-11-04'
let groups = str.matchAll(reg).groups
for(let {year,month,day} of groups){
    // ...
}

// (?:.) 排除组
let reg = /(:?[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;


// x(?=y) 前瞻断言，它表示匹配 x, 仅在后面是 y 的情况
// x(?!y) 前瞻否定，查找 x, 但是仅在不被 y 跟随的情况下匹配成功
let str = '1 turkey costs 30€'
str.match(/\d+(?=€)/) // 30
let str = '2 turkeys cost 60€'
str.match(/\d+(?!€)/) // 2


// 前瞻断言允许添加一个后面要跟着什么的条件判断，后瞻断言相反
// (?<=y)x 后瞻断言
// (?<!y)x 后瞻否定
str.match(/(?<=(http|https):\/\/)[a-zA-Z\.0-9]+(?=\/)/ig);
