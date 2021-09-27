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
