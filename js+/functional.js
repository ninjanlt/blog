/**
 * 函数式编程
 * 函数式编程可以使用（交换律、结合律、分配律）等数学之法来帮助我们简化代码的实现
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
 * 函数是“一等公民”？
 * 
 */
