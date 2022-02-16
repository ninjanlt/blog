/**
 * fetch API 仅支持现代浏览器不支持 IE
 * 与 axios 区别，它通过 response.text() 方法获取数据，而 axios 获取数据方式 response.data，
 * 不能取消请求、不能获取进度、不能设置超时、兼容性差。
 * 
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

// 添加超时时间
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...defaultOptions.headers, ...options.headers };
    let abortId;
    let timeout = false;
    if (options.timeout) {
      abortId = setTimeout(() => {
        timeout = true;
        reject(new Error('timeout!'));
      }, options.timeout || 6000);
    }
    fetch(url, { ...defaultOptions, ...options, headers })
      .then((res) => {
        if (timeout) throw new Error('timeout!');
        return res;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(abortId);
        reject(e);
      });
  });
}

// 设置中断请求
const controller = new AbortController();
const signal = controller.signal;

fetch('/data?name=fe', {
  method: 'GET',
  signal,
})
  .then(response => response.json())
  .then(resData => {
    const { status, data } = resData;
    if (!status) {
      window.alert('发生了一个错误！');
      return;
    }
    document.getElementById('fetch-str').innerHTML = data;
  });
controller.abort();