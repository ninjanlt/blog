/**
 * 原型链继承：
 *  通过将子类的原型对象作为父类的实例
 * 缺点：
 *  引用类型的属性被所有实例共享
 *  在创建子类的实例时，不能向父类传参
 * 
 */

function Parent() {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() { }

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child();
console.log(child1.getName())


/**
 * 借用构造函数继承：
 *  通过 call 去改变 this 指向执行父类方法
 * 缺点：
 *  子类不能访问父类原型身上定义的方法
 * 
 */
function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');
console.log(child1.name); // kevin

var child2 = new Child('daisy');
console.log(child2.name); // daisy


/**
 * 组合继承
 *  结合原型链继承和构造函数继承方式
 * 缺点：
 *  父类构造函数始终会被调用两次
 * 
 */
function Parent(name) {
    console.log('执行Parent')
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
    this.publicMethod = () => {
    }
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]


/**
 * 寄生式继承
 *  构造函数和工厂的模式，创建一个实现继承的函数，以某种方式增强对象
 * 
 */
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}


/**
 * 寄生组合式继承
 *  不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本
 * 
 */
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    console.log('执行SubType')
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let subTupe1 = new SubType('name1', 1)
let subTupe2 = new SubType('name2', 2)