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
 * 构造函数身上会有一个 prototype 来指回它的原型
 * 构造函数本身也是一个实例对象它通过 __proto__ 来指向函数 prototype 原型对象
 * 
 */
 let arr = [1, 2, 3];
 alert( arr.__proto__ === Array.prototype ); // true
 alert( arr.__proto__.__proto__ === Object.prototype ); // true
 alert( arr.__proto__.__proto__.__proto__ ); // null


 /**
  * 继承
  * 1. 原型链继承
  *     通过将子类的原型对象作为父类的实例
  *     缺点就是不能向父类构造函数进行传参、父类身上的引用类型会被实例共享
  * 2. 盗用构造函数继承
  *     通过在子类中使用 call 方法，实现盗用父类构造函数向父类传参
  *     缺点无法继承父类原型对象的属性和方法
  * 3. 组合继承
  *     将以上两种方法进行合并
  *     缺点父类构造函数会被调用多次
  * 4. 寄生组合继承
  *     建立在组合继承基础之上，使用 Object.create 方法
  *     缺点存在效率问题
  * 
  */
function Animal(name) {
    this.name = name;
    this.colors = ['red','blue'];
}
Animal.prototype.eat = function() {
    console.log(this.name + ' is eatting');
}
function Dog(name) {
    Animal.call(this,name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name);  // 输出dog1
console.log(dog2.colors);// 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting


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