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
    this.colors = ['red', 'blue'];
}
Animal.prototype.eat = function () {
    console.log(this.name + ' is eatting');
}
function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
var dog1 = new Dog('dog1');
var dog2 = new Dog('dog2');
dog1.colors.push('yellow');
console.log(dog1.name);  // 输出dog1
console.log(dog2.colors);// 输出['red','blue']
console.log(dog2.eat()); // 输出dog2 is eatting