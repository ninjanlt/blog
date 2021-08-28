/**
 * map 它是一种二维数组结构，其中每一项数组中都是以 [key, value] 的形式
 * 它数据结构中的 key 可以是任意数据
 * 通过调用实例 set 方法设置元素集合，返回值是该实例对象，支持链式调用
 * has 返回值是 boolean 值
 */

let a = {}
let b = {}

let obj = {
    [a]: {},
    [b]: {}
}

console.log(obj.a) // undefined

let map = new Map()
map.set(NaN, 100)
map.set(NaN, 101) // 覆盖

console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true

console.log(+0 === -0) // true
console.log(Object.is(+0, -0)) // false

map.delete(NaN)
map.clear() // 返回值 undefined

let map = new Map([['a': 1], ['b', 2], ['c', 3]])

for (let key of map.keys()) {
    console.log(key) // a b c
}

for (let value of map.values()) {
    console.log(value) // 1 2 3
}

for (let [key, value] of map.entries()) {
    console.log([key, value]) // ['a', 1] ['b', 2] ['c', 3]
}

for (let i of map) {
    console.log(i) // ['a', 1] ['b', 2] ['c', 3]
}