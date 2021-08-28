// 类中方法没有逗号间隔
class User{
    // #name 这样写法作为类的私有属性
    intro(){
        console.log(name)
    }
    constructor(name){
        this.name = name
    }
    go(){
        console.log('action ~')
    }
}
let user = new User('lxm')
user.go()

// class 是函数 function
alert(typeof User); // function

// 更确切地说，是构造器方法
alert(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
alert(User.prototype.sayHi); // alert(this.name);

// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi


/**
 * 1. 通过 super 调用父类的构造方法
 * 2. 重写从父类中继承的一般方法
 * 3. 如果一个属性前面加了 static 那么这个属性将成为类的一个属性，实例对象无法访问
 * 
 */
class Person{
    height = 179; // 添加到每个实例对象上都会有这个属性
    static nice = '炒鸡' // 添加到类身上，实例访问不到
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    eat(){
        console.log('吃');
    }
}

class Obj extends Person{
    constructor(name,age,car){
        super(name,age);
        this.car = car;
    }
    eat(){
        console.log('喝'); // 方法的重写
    }
}


/**
 * 计算属性
 * get
 * set
 * 
 */
class MyClass {
    prop = value; // 属性
  
    constructor(...) { // 构造器
      // ...
    }
  
    method(...) {} // method
  
    get something(...) {} // getter 方法
    set something(...) {} // setter 方法
  
    [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
    
    // 为每一个实例对象封装一个方法
    click = () =>{
        console.log(this.name)
    }
}


/**
 * super 关键字
 * 1. 作为对象执行 super.method 此时的 super 指向父类原型对象 A.prototype
 * 2. 作为函数执行 super() 来调用一个父类 constructor 代表父类的构造函数
 * 3. 静态方法中 super.method 指向父类，而不是父类原型对象
 * 4. 作为子类静态方法中通过 super 调用父类的方法，内部 this 指向当前子类
 * 
 */
class Small extends Big{
    // 派生类构造器
    constructor(...args){
        super(...args)
        // 可以生成新的属性
        this.arg = arg 
    }
}
// super执行的原理
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
    // 这就是 super.eat() 大概工作的方式
    this.__proto__.eat.call(this);
  }
};