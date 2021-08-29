/**
 * proxy 代理对象通过对目标对象的代理配置来进行操作
 * 参数一：目标对象
 * 参数二：options 配置对象
 * get = 读取属性
 * set = 写入属性
 * has = in 操作符
 * deleteProperty = delete 操作符
 * apply = 函数调用
 * construct = new 操作符
 * getPrototypeOf = Object.getPrototypeOf
 * setPrototypeOf = Object.setPrototypeOf
 * isExtensible = Object.isExtensible
 * preventExtensions = Object.preventExtensions
 * defineProperty = Object.defineProperty, Object.defineProperties
 * getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor/for..in/Object/keys/values/entries
 * ownKeys = Object.getOwnPropertyNames/Object.getOwnPropertySymbols/for..in/Object/keys/values/entries
 * 
 */
let arr = [1,2,3]
arr = new Proxy(arr, {
    get(target, prop){
        if(prop in target) return target[prop]
        else return undefined
    },
    set(target, prop, val){
        if(typeof val == 'number'){
            target[prop] = val
            return true
        }else{
            return false
        }
    }
})
console.log(arr[1]) // 2
arr.push(1)

// 撤销代理函数
const obj =  {a: '群主', b: '男群友' }
let { proxy, revoke } = Proxy.revocable(obj,Reflect)
revoke()
console.log(proxy, proxy.a) // TypeError


/**
 * Reflect
 * 
 */
let info = {
    _name:'world',
    get name(){
        return this._name
    }
}
let userReflect = new Proxy(info,{
    get(target,prop){
        return Reflect.get(target,prop)
    }
})
let admin = {
    __proto__:userReflect
    _name:'admin'
}
console.log(admin.name) // admin