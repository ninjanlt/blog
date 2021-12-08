// 1. 字面量方式创建
var dog = {name: 'dog'};

// 2. 构造函数方式创建
var timi = new Object();

// 3. 工厂模式创建
function createObj() {
    return new Object();
}

/**
 * 对象中属性 key 都是以字符串形式存储的
 * 1. 通过点语法读取对象的属性键名
 * 2. 通过中括号语法 ['key'] 读取对象的属性键名
 * 3. 通过 [a] 变量形式读取属性，最终会将变量的值转为字符串
 * 
 */
var objK = {
    name: 'k',
    age: 90
}
console.log(objK['name']) // k
console.log(objK.age) // 90


/**
 * 委托
 * 每一个对象身上都会有一个 __proto__ 属性来指向它的原型对象
 * 原型对象身上会有一个 constructor 属性来指向它的构造函数，同时 __proto__ 指向 Object.prototype
 * 构造函数身上会有一个 prototype 来指回它的原型，同时构造函数本身也是一个实例对象通过 __proto__ 指向 Function.prototype
 * 而 Function 构造函数的 prototype 和 __proto__ 都是指向 Function.prototype
 * 而 Object 构造函数的 __proto__ 指向 null
 * 
 */
 let arr = [1, 2, 3];
 alert( arr.__proto__ === Array.prototype ); // true
 alert( arr.__proto__.__proto__ === Object.prototype ); // true
 alert( arr.__proto__.__proto__.__proto__ ); // null

/**
 * 常用的对象方法
 * 
 */

// Object.assign 合并对象，属性相同后面的覆盖前面的
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }

// Object.keys 将对象键名转数组
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ['0', '1', '2']

// Object.values 将对象属性值转数组
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// Object.entries 将对象键值对转二维数组
const obj1 = {
    a: 'somestring',
    b: 42
};
for (const [key, value] of Object.entries(obj1)) {
    console.log(`${key}: ${value}`);
}

// Object.freeze 冻结对象不能以任何方式修改
let fz = { count: 3 };
Object.freeze(fz);
fz.count = 10 // Throws an error in strict mode

// Object.prototype.hasOwnProperty() 查找自身是否包含的属性
let hs = { total: 10 }
hs.hasOwnProperty('total') // true