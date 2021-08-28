/**
 * 具有相同类型或者不同类型的数据有序集合，一次性存储多个数据，具有下标值，长度
 */

// 字面量定义
var arr = [1,2,3,4,5]

// 构造函数定义
var arr1 = new Aarray(10) // [undefined...]

// 数组调用 toString 方法以逗号隔开元素，数组本身没有 Symbol.toPrimitive，也没有 valueOf 方法
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"

// ============================================================================================

// spread 展开数组 es6语法
let arr = [1,2,3];
let [a,b,c] = arr;

// 不需要的元素以逗号进行跳过
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"]

// 等号右侧可以是任何可迭代对象
let [a, b, c] = "abc"
let [one, two, three] = new Set([1, 2, 3])

// 赋值给等号左侧的任何内容
let user = {}
[user.name, user.age] = 'Ilya herry'.split(' ') // {name: "Ilya", age: "herry"}

// 与 .entries() 方法进行循环操作、Map集合对象也可以
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}

// 解构三点运算符
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"]

// 解构默认值
let [name = "Guest", surname = "Anonymous"] = ["Julius"]

// ============================================================================================

// Array.of 创建占位元素数组
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]

// Array.from(arrayLike[, mapFn[, thisArg]]) 可以将伪数组转为具备length和方法的数组
Array.from([1, 2, 3], x => x + x); // [2, 4, 6]
Array.from({length: 5}, (v, i) => i); // [0, 1, 2, 3, 4]

// Array.isArray 判断是否是数组类型
Array.isArray([])

// ============================================================================================

// 改变数组本身的方法
// 1. push(element1, ..., elementN) 末尾增加元素，返回数组长度
let arr = [4,5,6]
console.log(arr.push(10,20)) // 5
console.log(arr) // [4,5,6,10,20]

// 2. unshift(element1, ..., elementN) 头部增加元素，返回数组长度
let arr = [1,2,3]
console.log(arr.unshift(10,20)) // 5
console.log(arr) // [10,20,1,2,3]

// 3. pop() 末尾删一个元素，返回删除的元素
let arr = [1,2,3,4,5]
console.log(arr.pop()) // 5
console.log(arr) // [1,2,3,4]

// 4. shift() 头部删除一个元素，返回删除的元素
let arr = [1,2,3,4]
console.log(arr.shift()) // 1
console.log(arr) // [2,3,4]

// 5. splice(index[, deleteCount, elem1, ..., elemN]) 增删改数组，返回被删除元素组成的数组
var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = myFish.splice(myFish.length - 3, 2); // 被删除的元素: ["blue", "trumpet"]

// 6. reverse 反转数组，返回颠倒后的数组
let arr = [1,2,3]
arr.reverse() // [3,2,1]

// 7. sort 数组排序
// 如果省略参数，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序
// 1)、如果返回值小于0，那么a会被排列在b之前
// 2)、如果返回值大于0，那么b会被排列在a之前
// 3)、如果返回值等于0，则不改变
let arr = [12,32,1,2,90,56]
arr.sort((a, b) => a - b)

// 8. fill 填充数组
let arr = Aarray(3).fill({}) // [{},{},{}]

// ============================================================================================

// 数组查找方法
// 1. join 数组转字符串，默认以逗号连接
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join(); // "Wind,Rain,Fire"

// 2. indexOf(searchItem[, index]) 检索指定元素位置，返回值是查找的元素下标，如果没有找到返回 -1
['a', 'b', 'a', 'c'].indexOf('a',1); // 2

// 3. find 默认返回的是查找到的元素，未找到返回undefined
let result = arr.find(function(item, index, array) {
    // 如果返回 true，则返回 item 并停止迭代
    // 对于 falsy 假值则返回 undefined
})

// 4. findIndex 默认返回的是查找到的元素下标，未找到返回-1
arr.findIndex((item) => {item > 10})

// 5. arr.includes(item, from) 从索引 from 开始搜索元素，如果找到则返回 true
var arr = [NaN]
arr.includes(NaN) // true

// 6. some every 单元测试，检索数组中的每一项符合条件函数，返回值是满足条件的布尔值
let arr = [10, 11, 3]
Array.some((item,index,arr)=> item > 10, this) // true
// every则是数组中每一项满足整个函数测试的布尔值
Array.every((item,index,arr)=> item > 10, this) // false

// 7. flat 数组扁平化，将多维数组转成一维数组
[1,2,3,[2,4]].flat(Infinity)
export function flatten(array){
    return array.reduce((newArr,children)=> newArr.concat(children), [])
}

// 8. flatMap 相当于加工和扁平化
let arr = ["科比 詹姆斯 安东尼", "利拉德 罗斯 麦科勒姆"];
console.log(arr.flatMap(x => x.split(" "))); // [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]

// 9. forEach 数组遍历，返回值 undefined
arr.forEach(function(item, index, array) {
    // ... do something with item
})

// ============================================================================================

// 数组复制方法
// 1. concat 链接数组
let arr = [1,2]
arr.concat(8,9,10) // [1,2,8,9,10]
[1,2, ...arr]

// 2. slice(start, end) 截取数组，含头不含尾，返回创建副本，可选参数
['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'].slice(1,-1) // ["Orange", "Lemon", "Apple"]

// 3. map 加工数组返回的是加工后的新数组
arr.map((item,index)=>{return 1});

// 4. filter 通过传递的 callback 进行每一项元素调用，返回值为 true 则会在新数组中添加该元素
let results = arr.filter(function(item, index, array) {
    // 如果 true item 被 push 到 results，迭代继续
    // 如果什么都没找到，则返回空数组
})

// 5. reduce reduceRight 累加器，接收两个参数 callback 以及 initVal
let value = arr.reduce(function(pre, cur, index, array) {
    // ...
  }, [initial])
// 检测
const arr = [1, 3, 4, 5, 7]
const total = arr.reduce((preTotal, next) => preTotal + (next%2===1 ? next : 0), 0)