/**
 * 下载后端返回的文件
 * @param {String} link 
 * @param {String} name
 * download('http://111.229.14.189/file/1.xlsx')
 */
export function download(link, name) {
    if (!name) {
        name = link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 * downloadFile('1.txt','lalalallalalla')
 * downloadFile('1.json',JSON.stringify({name:'hahahha'}))
 */
export function downloadFile(name, content) {
    if (typeof name == 'undefined') {
        throw new Error('The first parameter name is a must')
    }
    if (typeof content == 'undefined') {
        throw new Error('The second parameter content is a must')
    }
    if (!(content instanceof Blob)) {
        content = new Blob([content])
    }
    const link = URL.createObjectURL(content)
    download(link, name)
}

/**
 * 获取文件后缀名
 * @param {String} filename
 * getExt("1.mp4") //-> mp4
 */
export function getExt(filename) {
    if (typeof filename == 'string') {
        return filename
            .split('.')
            .pop()
            .toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}

/**
 * 防抖
 * @param {Function} func 
 * @param {Number} wait 
 * @param {Boolean} immediate
 */
export function debounce(func, wait = 500, immediate = false) {
    var timeout
    return function () {
        var context = this
        var args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}

/**
 * 节流，多次触发，间隔时间段执行
 * @param {Function} func
 * @param {Int} wait
 * @param {Object} options
 */
export function throttle(func, wait = 500, options) {
    var timeout, context, args
    var previous = 0
    if (!options) options = { leading: false, trailing: true }

    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    var throttled = function () {
        var now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}

/**
 * 假值判断
 * @param {any} value
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 判空
 * @param {any} value 
 */
export const isVoid = (value) => value === undefined || value === null || value === "";

/**
 * 参数传递去除空值
 * @param {Object} object 
 */
export const cleanObject = (object) => {
    // Object.assign({}, object)
    if (!object) {
        return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};

/**
 * 生成随机id
 * @param {Number} length
 * @param {String} chars
 * uuid() 第一个参数指定位数，第二个字符串指定字符，都是可选参数，如果都不传，默认生成8位
 */
export function uuid(length, chars) {
    chars =
        chars ||
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    length = length || 8
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/**
 * 深拷贝
 * @param {Object} obj
 */
export function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj
    }
    if (obj == null) {
        return obj
    }
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 数组去重
 * @param {Array} arr
 */
export function uniqueArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('The first parameter must be an array')
    }
    if (arr.length == 1) {
        return arr
    }
    return [...new Set(arr)]
}

/**
 * 对象转化为formdata
 * @param {Object} object
 */
export function getFormData(object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => {
        const value = object[key]
        if (Array.isArray(value)) {
            value.forEach((subValue, i) =>
                formData.append(key + `[${i}]`, subValue)
            )
        } else {
            formData.append(key, object[key])
        }
    })
    return formData
}