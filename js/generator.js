/**
 * 生成器函数，它会返回一个特殊的对象，最主要的方法 next() 执行最近的 yield <value> 语句
 * 返回一个与 iterator 类似的对象
 * 
 */
function* generateTest(){
    yield 1
    yield 2
    return 3
}
let generator = generateTest()
let one = generator.next()  // {value: 1, done: false}

// 迭代性、支持 ...spread 语法、可以作为 Symbol.iterator 进行迭代
let obj = {
    name:'generator iterator 迭代接口',
    player:['uzi','ning','theshy','jacklove'],
    
    *[Symbol.iterator](){
        for(let i = 0; i < this.player.length; i++) yield this.player[i]
    }
}
console.log([...obj])

// 组合序列 yield* 指令将执行 委托 给另一个 generator
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePassWorld(){
    yield* generateSequence(48,57)
    yield* generateSequence(65,90)
    yield* generateSequence(97,122)
}

let str = ''
for(let k of generatePassWorld()){
    str += String.formCharCode(k)
}
console.log(str)

// yield 是一条双向路，不仅可以向外部返回结果，还能将外部的值传递到内部变量
function* fun(){
    let result = yield {name:'test'}
    console.log(result)
}
let obj = fun()
obj.next() // 第一次执行是将 yield 结果返出
obj.next(4)

// generator.throw 如果在生成器内部没有捕获错误，则会掉入外部，如果在外部也没有捕获错误，则会杀死脚本
function* generate(){
    let result = yield {name:'test'}
    // try...catch
}
let obj = generate()
let result = obj.next()
try{
    obj.throw(new Error('is error'))
}catch(e){
    console.log(e)
}

// generator 异步迭代模拟网络请求，可以使用 for await...of 进行迭代
async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
      // 耶，可以使用 await 了！
      await new Promise(resolve => setTimeout(resolve, 3000));
      yield i;
    }
}
(async () => {
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      console.log(value); // 1，然后 2，然后 3，然后 4，然后 5
    }
})();