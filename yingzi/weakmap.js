// WeakMap 弱映射，弱引用，实现私有成员，可以被浏览器垃圾回收机制给检测

let count = 0,
    button = document.getElementById('button');
    
function buttonClick (){
    count += 1
}
button.addEventListener('click', buttonClick);
button.removeEventListener('click', buttonClick);

button = null; // 移除节点
count = null; // 手动移除变量防止内存泄露

// WeakMap 改进
let wm = new Map()
wm.set(button, {count: 0});

function buttonClick(){
    let data = wm.get(button)
    data.count += 1
}
button.addEventListener('click', buttonClick);
button.removeEventListener('click', buttonClick);
button = null; // 移除节点，对应的状态被回收


// 私有成员
let Stack = (function(){
    let wm = new Map()
    return Class {
        constructor(){
            wm.set(this, [])
        }
        push(el){
            wm.get(this).push(el)
        }
        toString(){
            console.log(wm.get(this))
        }
    }
})()

let stack = new Stack()
stack.push(1)
stack.push(2)
console.log(stack) // 私有成员属性，对外不可见
stack.toString()