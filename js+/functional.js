/**
 * 函数式编程
 * 函数式编程可以使用（交换律、结合律、分配律）等数学之法来帮助我们简化代码的实现
 *
 * 特点：
 *      1. 纯函数
 *      2. 数据不可变
 */

// 函数柯里化
const add = a => b => c => a + b + c;
add(1)(2)(3);

function curry(fn, ...args) {
    const length = fn.length
    let lists = args || []
    let listLen
    return function (..._args) {
        lists = [...lists, ..._args]
        listLen = lists.length
        if (listLen < length) {
            const that = lists
            lists = []
            return curry(fn, ...that)
        } else if (listLen === length) {
            const that = lists
            lists = []
            return fn.apply(this, that)
        }
    }
};

const curryAdd = curry(add);
// 以下输出结果都相同
curryAdd(1, 2, 3); // 6
curryAdd(1, 2)(3); // 6
curryAdd(1)(2)(3); // 6
curryAdd(1)(2, 3); // 6


// 偏函数
const add = a => (b, c) => a + b + c;
add(1)(2, 3);


// 代码组合 compost
const toUpperCase = (str) => str.toUpperCase();
const reverse = (arr) => arr.reverse();
const head = (arr) => arr[0];
// 我们可以使用结合律将这三个函数进行组合
compose(compose(toUpperCase, head), reverse);
compose(toUpperCase, compose(head, reverse));
// 其中 Redux 开源库中写法
const compose = (...args) => (initValue) => args.reduceRight((a, b) => b(a), initValue);


// 范畴论
// 简单来讲可以理解为一个容器，把原来对值的操作，现转为对容器的操作
// 函数式编程就是学习各种函子的过程
// 函数式编程中，函子 Functor 是实现 map 函数的容器
class Functor {
    constructor(value) {
        this.value = value;
    }
    map(fn) {
        return new Functor(fn(this.value));
    }
}
// 避免使用面向对象的编程方式，而是对外暴露一个 of 接口，也称为 ponited functor
Functor.of = value => new Functor(value);
