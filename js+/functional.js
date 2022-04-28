/**
 * 函数式编程
 * 函数式编程可以使用（交换律、结合律、分配律）等数学之法来帮助我们简化代码的实现。
 *
 */

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const x = 10;
const y = 20;
const z = 30;

// 结合律（assosiative）
add(add(x, y), z) == add(x, add(y, z));
// 交换律（commutative）
add(x, y) == add(y, x);
// 同一律（identity）
add(x, 0) == x;
// 分配律（distributive）
multiply(x, add(y, z)) == add(multiply(x, y), multiply(x, z));


/**
 * 纯函数
 * 即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。
 * 副作用
 * 只要是跟函数外部环境发生的交互就都是副作用。
 * 例如（更改文件系统、往数据库插入记录、发送一个 http 请求、可变数据、打印/log、获取用户输入、DOM 查询、访问系统状态）
 * 
 */

let minimum = 21;
// 不纯
// 它自身返回的状态值取决于外部的变量，它引入了外部的环境反而增加了认知负荷。
const checkAge = age => arg >= minimum;
// 但是我们可以将它改成一个不可变的对象，使它变得纯粹。
const immutableState = Object.freeze({
    minimum: 21
})
// 纯的
const checkAgePrue = age => {
    let minimum = 21;
    return age >= minimum;
};


/**
 * 柯里化 curry
 * 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
 * 
 */

const curry = x => y => x + y;
// 使用闭包记录第一次调用的参数
const increment = curry(1);
increment(2); // 3
increment(3); // 4


/**
 * 代码组合 compose
 * 组合的方式就像在饲养函数，将具备两种特点的函数进行拆分再结合，产生一个新的函数。
 * 
 */

const compose = (f, g) => x => f(g(x)); // g函数调用将先于f函数，这样就形成了从右向左的数据流
const toUpperCase = str => str.toUpperCase();
const exclaim = str => str + '!';
const shout = compose(toUpperCase, exclaim);
shout('hello world'); // 'HELLO WORLD!'

// 符合结合律的特性，不管你是把g和h分组，还是把f和g分组都不重要
// 因为代码的执行都是“左倾”，右向左依次执行
const associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// 既然组合是符合结合律的，它就可以有很多变种
// 这个过程叫做“extract method”
const compose = (f, g, h) => x => f(g(h(x)));


/**
 * 无痛的 pianfree
 * 函数无需提及要操作的数据
 * 能够帮助我们减少不必要的命名，让代码保持简洁和通用
 * 
 */

// 非pianfree因为提及了word
const snakCase = word => word.toUpperCase().replace(/\s+/ig, '');
// 通过管道把数据在单个参数的函数中传递
// 利用curry使每一个函数都先接收到数据，然后操作数据，再把数据进行传递。
const snakCase1 = compose(replace(/\s+/ig, ''), toUpperCase);


/**
 * debug
 * 组合中常见的错误
 * 
 */

// 错误的做法，这里根本不知道传给map的参数是什么样的
const latin = compose(map, angry, reverse);
latin(["frog", "eyes"]); // error
// 正确的做法，让每一个函数都接收实际的参数
const latin1 = compose(map(angry), reverse);


/**
 * 容器
 * 必须能够装载任意类型的值
 * 
 */

const Container = function (x) {
    this.__value = x;
}
Container.of = function (x) { return new Container(x) };
Container.prototype.map = function (f) { return Container.of(f(this.__value)) };
// functor
Container.of(2).map(function (two) { return two + 2 });
Container.of("flamethrowers").map(function (s) { return s.toUpperCase() });
