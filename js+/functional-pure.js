/**
 * 函数式编程 - 纯函数
 * 只关注于该函数输入和输出，外界所带来的影响都不是纯函数。
 * 例如：
 * 1. 操作DOM
 * 2. 异步获取数据
 * 3. 读取或改变外界的值
 * 4. 返回 undefined
 * 
 */

// imperative
let name = 'ming';
function great(){
    console.log(name)
}
great(); // ming
name = 'xiao';
great(); // xiao

// 从纯函数的角度去考虑代码，更好的预测函数的结果，只关注函数本身的功能性。
// functional
function greatPure(name){
    return `Hello,${name}!`
}
greatPure('ming'); // Hello,ming!
greatPure('xiao'); // Hello,xiao!


// effect
function getDate(){
    return new Date().toDateString();
}

// not effect
function getWorkshopDate(){
    return new Date(2022,1,23).toDateString();
}


/**
 * 递归与迭代
 * 迭代更像是命令式编程，我们需要关注的点是当前迭代的次数时间，
 * 递归则是关注点在于该函数做了什么功能，更符合函数式编程的思想。
 * 
 */

// interation
function sum(nums){
    let total = 0;
    for(let i = 0; i < nums.length; i++){
        total += nums[i];
    }
    return total;
}
sum([1,2,3,4,5]); // 15

// recursion
function sumr(nums){
    if(nums.length === 1){
        return nums[0];
    }else{
        return nums[0] + sumr(nums.slice(1));
    }
}
sumr([1,2,3,4,5]); // 15

