/**
 * 
 * XML Extensibel MarkUp Language
 * HTML Hyper Text MarkUp Language
 * Ajax Async Javascirpt And XML
 * 
 * 浏览器页面无刷新获取数据，实现局部渲染技术
 * 不利于 SEO、没有浏览器历史记录、存在跨域问题
 */
function ajax(options) {
    let xhr
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest() // ie7+
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    options = options || {}
    options.method = (options.method || 'GET').toUpperCase()
    options.contentType = options.contentType || 'json'
    const { url, data, method, contentType } = options
    if (contentType === 'GET') {
        // open(methods, url, [async, user, password])
        xhr.open(contentType, `${url}?${params}`, true)
        // 发送请求
        xhr.send()
    } else if (contentType === 'POST') {
        xhr.open(contentType, url, true)
        xhr.send(data)
    }
    xhr.onreadystatechange = () => {
        // readyState 内部五种状态 0 1 2 3 4
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                // responseText 服务器返回的文本数据
                options.sucess && options.sucess(xhr.responseText, xhr.responseXML)
            } else {
                options.error && options.error(status, xhr.responseText)
            }
        }
    }
}


/**
 * XMLHttpRequest Level 2
 * Html5 将它纳入规范再原基础上提出升级版
 * 
 * 1. 设置HTTP请求的超时时间
 * 2. 通过 FormData 发送表单数据
 * 3. 上传文件
 * 4. 跨域请求
 * 5. 获取服务器端的二进制数据
 * 6. 获得数据传输的进度信息
 */

// 1. 设置HTTP请求的超时时间
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/getList');
xhr.timeout = 2000; // 单位毫秒
xhr.ontimeout = function (event) {
    // 超时处理
};
xhr.send();

// 2. FormData 表单数据
var xhr = new XMLHttpRequest();
var form = new FormData();
form.append('username', 'lxm');
form.append('password', '123');
xhr.open('POST', '/api/save');
xhr.send(form);

// 3. 支持上传文件
// 通过获取 input 文件传输框来获取 file 对象
document
    .getElementById('#file')
    .addEventListener(
        'change',
        function (event) {
            const form = new FormData();
            form.append('uploadFile', this.files[0]);
            xhr.send(form);
        }
    );

// 4. CORS 请求处理，需要后端返回 Access-Control-Allow-Origin 响应头
// CORS 请求默认不发送 Cookie，如果需要发送 Cookie，服务器需要返回 Access-Control-Allow-Credentials: true
// 前端需要在请求前进行 Cookie 处理
xhr.withCredentials = true;


// 5. 接收二进制数据
xhr.responseType = 'arraybuffer';
xhr.onload = function () {
    var arrayBuffer = xhr.response;
}

// 6. 数据传输进度信息
let onloadstart = () => { }; // 获取数据开始
let onprogress = () => { }; // 数据传输过程中
let onabort = () => { }; // 数据获取被取消
let onerror = () => { }; // 获取数据错误
let onload = () => { }; // 获取数据成功
let ontimeout = () => { }; // 获取数据超时
let onloadend = () => { }; // 获取完成（无论成功或失败）

