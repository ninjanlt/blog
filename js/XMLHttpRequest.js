/**
 * Ajax 不刷新浏览器页面从而能够向服务端进行通信获取数据
 * 缺点：不利于 SEO、没有浏览器历史记录、存在跨域问题
 * 
 */
function ajax(options) {
    const xhr = new XMLHttpRequest()
    options = options || {}
    options.method = (options.method || 'GET').toUpperCase()
    options.contentType = options.contentType || 'json'
    const {url,data,method,contentType} = options
    if(contentType === 'GET'){
        // open(methods, url, [async, user, password])
        xhr.open(contentType,`${url}?${params}`,true)
        // 发送请求
        xhr.send()
    }else if(contentType === 'POST'){
        xhr.open(contentType,url,true)
        xhr.send(data)
    }
    xhr.onreadystatechange = () => {
        // readyState 内部五种状态 0 1 2 3 4
        if(xhr.readyState === 4){
            let status = xhr.status
            if(status >= 200 && status < 300){
                // responseText 服务器返回的文本数据
                options.sucess && options.sucess(xhr.responseText, xhr.responseXML)
            }else{
                options.error && options.error(status,xhr.responseText)
            }
        }
    }
}
