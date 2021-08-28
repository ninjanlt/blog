/**
 * fetch API 仅支持现代浏览器不支持 IE
 * 与 axios 区别，它通过 response.text() 方法获取数据，而 axios 获取数据方式 response.data
 * response.text() 文本
 * response.json() json
 * response.formData() 
 * response.blob() 图片
 * response.arrayBuffer() 二进制流
 * 
 */

let response = await fetch('https://api.github.com/repos/')
let blob = await response.blob()

response.headers.get('Content-Type') // "image/svg+xml"

// 设置请求头
let response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
})
