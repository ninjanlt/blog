// Set 集合的元素可以是任意类型的唯一值，包含原始类型和引用类型

let set = new Set()
set.add(1).add('1').add(NaN).add(0)

console.log(set.size) // 4
console.log(set.has('1')) // true
console.log(set.delete(NaN)) // true
console.log(set.has(NaN)) // false
console.log(set.clear()) // undefined

for(let i of set){
    console.log(i) // 1 '1' 0
}

// WeakSet 弱引用
let set = new Set(),
    key = {}

set.add(key)
key = null
console.log(set.size) // 1，set中的引用没有被垃圾回收

let ws = new WeakSet(),
    key = {}
    
ws.add(key)
key = null
console.log(ws.has(key)) // false
console.log(WeakSet.prototype)