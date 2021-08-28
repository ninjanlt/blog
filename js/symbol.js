/**
 * ES6 新增基本数据类型，解决对象健名的命名冲突
 * symbol 数据类型不能与其它值参与计算
 * for in、for of 遍历时不会遍历 symbol 属性
 * 
 */

var sym1 = Symbol('one');
var sym2 = Symbol('two');
// symbol值主要就是用来给对象添加属性得时候防止属性重复用的
var obj = {
    Name:'xiaoming',
    age:33
};
obj[sym1] = 1;
obj[sym2] = 2;
 
console.log(obj['Symbol(one)']); // undefined
 
// 如果使用symbol值作为对象得属性
// 那么这个属性不允许遍历（读取）
// 所以，如果要读取就通过以下方法
var symArr = Object.getOwnPropertySymbols(obj);
console.log(obj[symArr[0]]);
console.log(obj[symArr[1]]);


/**
 * obj[Symbol.iterator] 的结果被称为迭代器
 * 一个迭代器必须有 next() 方法
 * 它返回一个 { done: Boolean, value: any } 对象
 * 这里 done: true 表明迭代结束，否则 value 就是下一个值
 * 内置的可迭代对象例如字符串和数组，都实现了 Symbol.iterator 接口
 * 
 */
let obj = {
    name: 'iterator迭代器',
    player:['uzi','ning','theshy','jacklove'],
  
    [Symbol.iterator]() {
      let index = 0
      let result = {}
      return {
          next:()=>{
              index < this.player.length ? 
              result = {value: this.arr[index],done: false} :
              result = {value: undefined, done: true}
              index++
              return result
          }
      }
    }
};
  
for (let k of obj) {
    alert(k);
};


// 异步迭代
[Symbol.asyncIterator](){
    let index = 0
    let result = {}
    let that = this
    return {
        async next(){
            await new Promise(resolve => setTimeout(resolve,2000))
            // ...省略
            return result
        }
    }
}

(async ()=> {
    for await (let k of obj){
        console.log(k)
    }
})()