/**
 * 双精度浮点数
 * 根据小数长度进行放大幂数
 * 最大能够处理14位小数
 * 
 */

const numLen = num => num.toString().split('.')[1].length;
const pow = (len1, len2) => Math.pow(10, Math.max(len1, len2));
const add = (num1, num2) => {
    const maxLen = pow(num1, num2);
    return (num1 * maxLen + num2 * maxLen) / maxLen;
}