
#### HTTP
> 对同一个服务器的并发连接个数最大为6条，并发限制是因为服务器承载压力造成的，由带宽和网页内容大小及服务器内存决定的

- 优点：
  - 无状态：对于事务处理没有记忆能力
  - 可靠传输：`http` 基于 `TCP/IP` 协议
  - 灵活可扩展：没有语法上的限制，传输形式的多样性

- 缺点：
  - 明文传输：将 `http` 报文信息暴露给外界，容易被截获篡改信息
  - 队头阻塞：当 `http` 开启长连接时，共用一个 `TCP` 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态

##### 0.9
- 请求端只能发送 `Get` 请求，返回的是 `HTML` 文本数据
  - 传输形式只有请求行信息不包含请求头请求体
  - 服务端返回的文件内容是 `ASCII` 字节码传输
  - 缺点无法传输 `JS` `CSS` 图片视频等类型文件，报文信息较少

##### 1.0
- 支持数据格式的多元化传输，方法增加了 `POST\HEAD`
- 新增请求头、请求体、响应头、响应体、状态码等信息
  - `Accept` 文件类型
  - `Accept-Encoding` 压缩格式
  - `Content-Type` 让响应数据不只限于超文本
  - `Expires`、`Last-Modified` 缓存头
  - `Authorization` 身份认证
- 新增缓存机制，用来缓存已下载过的资源，减轻服务器压力
- 缺点就是无法复用链接，容易造成对头阻塞问题

##### 1.1
- 持久化链接，不需要每次再进行 `TCP` 链接，单链接复用
  - `Connection: keep-alive` 支持持久化链接，针对同一个域名，浏览器默认支持 6 条 `TCP` 链接
- 新增 `Host` 字段用于支持虚拟主机（一台物理主机可以绑定多个虚拟主机，每个虚拟主机有单独的域名，这些域名公用一个 `IP` 地址）
- 管线化，支持批量发送请求解决对头阻塞问题，但是响应数据还是按照请求的顺序响应，相当于解决了一半的问题
- 支持响应式分块，实现了流式渲染，减低白屏时间 `Transfer-Encoding:chunked`
- 增加 `Cache-Control ETag` 缓存头
- 增加 `PUT PATCH HEAD OPTIONS DELETE` 方法
- 增加 `Cookie` 机制和安全机制
- 缺点对带宽的利用率不理想
  - `TCP` 慢启动
  - 同时建立起多条 `TCP` 链接，争抢网络带宽资源
  - 队头阻塞，限行管道队列

##### 2.0
- 帧协议，将消息分为一个或多个帧，通过二进制数据传输最小单位
- 数据流，建立连接内的双向字节流，可以承载一条或多条消息
- 多路复用，针对同一个域名资源只建立一个 `TCP` 通道，所有请求在此传输
- 首部压缩，通过首部表跟踪的字段对于相同的数据不会频繁携带，只会发送差异化数据
- 服务端推送，当服务器解析一个 `HTML` 页面后，服务器根据此页面上所引用的资源做提前推送
- 缺点丢包，同一域名下所有请求通过一条 `TCP` 管道传输，前者数据流出现丢包，阻塞后者请求

---

#### HTTPs
1. `https` 需要到 `CA` 机构申请证书，是收费的
2. `http` 是超文本传输协议，信息是明文传输，`https` 则具有安全性的 `ssl` 加密传输协议
3. 两者是完全不同的连接方式，用的端口也不一样，`80/443`
4. `http` 是无状态连接的，`https` 则需要 `ssl+http` 协议构建加密传输、身份认证的网络协议更加安全
5. 无状态就是其数据包发送、传输和接收都是相互独立的

---

#### 请求报文

```
请求行：
# POST  / http://nodejs.cn / HTTP/1.1 
请求方式      uri      协议的版本(1.0 2.0)

请求头：
# Host: nodejs.cn:8000        	主机名
# Connection: keep-alive      	连接设置
# Accept                      	设置客户端接受的数据类型
# Cache-Control: no-cache     	设置缓存
# User-Agent                  	设置当前客户端的标识
# ContentType: application/x-www-form-urlencoded 参数格式
# Referer                       得知请求资源的页面
# Accept-Encoding             	设置编码(gzip 压缩)
# Accept-Language             	设置接受的语言
# Cookie                      	保存的数据 

空行

请求体：
# username=admin&passworld=admin
```

#### 响应报文

```
响应行： 
# HTTP/1.1  200          OK  
  版本     状态码      状态标识

响应头：
# Server: nginx/1.15.12                   服务器信息
# Date: Fri, 22 Nov 2019 06:56:52 GMT     时间 GMT 时区
# Content-Type                            数据格式
# Transfer-Encoding: chunked              传输报文主体格式
# Content-Length                          内容的长度
# Last-Modified                           最后的修改时间
# Expires: Fri, 22 Nov 2019 18:56:52 GMT  过期时间
# Cache-Control: max-age=43200            缓存设置
# Set-Cookie: SESSION=NzBm                

空行

响应体：
# <html> <head></head><body></body> </html>
```

---

#### 请求方法

- `GET` 从服务器获取数据
- `POST` 用来传输实体的主体
- `PUT` 传输文件
- `DELETE` 删除服务器端资源
- `HEAD` 获取报文首部内容
- `OPTIONS` 查询服务器资源支持的方法
- `TRACE` 追踪路径，容易引发 `XST` 跨站追踪
- `CONNECT` 使用隧道协议连接代理

---

#### Get 和 Post 区别
- 缓存，`GET` 请求会被浏览器主动缓存下来，留下历史记录，而 `POST` 默认不会。
- 编码，`GET` 只能进行 `URL` 编码，只能接收 `ASCII` 字符，而 `POST` 没有限制。
- 参数，`GET` 一般放在 `URL` 中，因此不安全，`POST` 放在请求体中，更适合传输敏感信息。
- 大小，`GET` 请求大小有限制, 一般为 `2k`, 而 `POST` 请求则没有大小限制
- 幂等性，`GET` 是幂等的，而 `POST` 不是。(幂等表示执行相同的操作，结果也是相同的)
- 在地址栏输入 `url` 访问, `a` 链接跳转，`link href` 属性 `script src` 以及 `img` 的 `src` 都是 `get` 请求

---

#### 状态码
> RFC 规定 HTTP 的状态码为三位数，被分为五类:

- **1xx** 表示目前是协议处理的中间状态，还需要后续操作。
    - 101 Switching Protocols：在 `HTTP` 升级为 `WebSocket` 的时候，如果服务器同意变更，就会发送状态码 101

- **2xx** 表示成功状态。
    - 200 OK：是见得最多的成功状态码。通常在响应体中放有数据。
    - 204 No Content：含义与 200 相同，但响应头后没有 body 数据。
    - 206 Partial Content：顾名思义，表示部分内容，它的使用场景为 HTTP 分块下载和断电续传，当然也会带上相应的响应头字段Content-Range。

- **3xx** 重定向状态，资源位置发生变动，需要重新请求。
    - 301 Moved Permanently：即永久重定向，对应着302 Found，即临时重定向。
    - 比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址，而如果只是暂时不可用，那么直接返回302即可，和301不同的是，浏览器并不会做缓存优化。
    - 304 Not Modified: 当协商缓存命中时会返回这个状态码。详见浏览器缓存

- **4xx** 请求报文有误。
    - 400 Bad Request: 开发者经常看到一头雾水，只是笼统地提示了一下错误，并不知道哪里出错了。
    - 403 Forbidden: 这实际上并不是请求报文出错，而是服务器禁止访问，原因有很多，比如法律禁止、信息敏感。
    - 404 Not Found: 资源未找到，表示没在服务器上找到相应的资源。
    - 405 Method Not Allowed: 请求方法不被服务器端允许。
    - 406 Not Acceptable: 资源无法满足客户端的条件。
    - 408 Request Timeout: 服务器等待了太长时间。
    - 409 Conflict: 多个请求发生了冲突。
    - 413 Request Entity Too Large: 请求体的数据过大。
    - 414 Request-URI Too Long: 请求行里的 URI 太大。
    - 415 请求参数格式与后端不匹配
    - 429 Too Many Request: 客户端发送的请求过多。
    - 431 Request Header Fields Too Large请求头的字段内容太大。

- **5xx** 服务器端发生错误。
    - 500 Internal Server Error: 仅仅告诉你服务器出错了。
    - 501 Not Implemented: 表示客户端请求的功能还不支持。
    - 502 Bad Gateway: 服务器自身是正常的，但访问的时候出错了，啥错误咱也不知道。
    - 503 Service Unavailable: 表示服务器当前很忙，暂时无法响应服务。

---

#### Accept 字段
> 针对于接收端的字段，分为四种形式

##### 数据格式
- MIME(多用途互联网邮件扩展)。它首先用在电子邮件系统中，让邮件可以发任意类型的数据，这对于 `HTTP` 来说也是通用的，针对于服务端而言，这些类型体现在 `Content-Type` 这个字段
- 客户端也可以通过 `Accept` 字段来通知服务器接收的特定类型
    - text：text/html, text/plain, text/css 等
    - image: image/gif, image/jpeg, image/png 等
    - audio/video: audio/mpeg, video/mp4 等
    - application: application/json, application/javascript, application/pdf, application/octet-stream

##### 压缩方式
- 数据进行编码压缩 `Content-Encoding`
    - gzip: 当今最流行的压缩格式
    - deflate: 另外一种著名的压缩格式
    - br: 一种专门为 HTTP 发明的压缩算法

```
// 发送端
Content-Encoding: gzip
// 接收端
Accept-Encoding: gzip
```

##### 支持语言
- 接收方支持语言 `Accept-Language`，对于发送方 `Content-Language` 字段

```
Accept-Language: zh-CN,zh;q=0.9
```

##### 字符集
- 接收端对应为 `Accept-Charset`，发送端用在 `Content-Type` 字段中

```
Content-Type: text/html; charset=utf-8
Accept-Charset: charset=utf-8
```

---

#### 数据定长与不定长

- 定长包体，发送端在传输时携带 `Content-Length` 来指明包体长度
- 如果设置不当可以直接导致传输失败，超出字节长度

```js
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Length', 8)
    res.write('helloworld')
  }
})
server.listen(8081, () => {
  console.log('成功启动')
})
```

- 不定长包体，通过 `Transfer-Encoding:chunked` 表示分块传输数据
- `Content-Length` 字段会忽略，基于长连接持续推动动态内容

```js
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.setHeader('Content-Length', 10)
    res.setHeader('Transfer-Encoding', 'chunked')
    res.write('<p>来啦</p>')
    setTimeout(() => {
      res.write('第一次传输<br/>')
    }, 1000)
    setTimeout(() => {
      res.write('第二次传输')
      res.end()
    }, 2000)
  }
})
server.listen(8081, () => {
  console.log('成功启动')
})
```

---

#### 数据格式
- `GET, DELETE, HEAD` 方法，参数风格为标准的 `GET` 风格的参数，如 `url?a=1&b=2`
- `POST, PUT, PATCH, OPTIONS` 方法
  - `multipart/form-data` 表单形式提交，既可以上传键值对也可以上传多个文件
  - `application/x-www-from-urlencoded` 以键值对的数据格式提交
  - `application/json` 序列化字符串
  - `text/xml` 以 `xml` 格式传输
  - `text/plain` 数据以纯文本形式进行编码
  - `binary` 只可以上传二进制数据 `application/octet-stream` 用来上传文件，一次只能上传一个文件

---

#### 缓存机制
1. 客户端向服务器发出请求，请求资源 
2. 服务器返回资源，并通过响应头决定缓存策略 
3. 客户端根据响应头的策略决定是否缓存资源，并将响应头与资源缓存下来 
4. 在客户端再次请求且命中资源的时候，此时客户端去检查上次缓存的缓存策略，根据策略的不同、是否过期等判断 是直接读取本地缓存还是与服务器协商缓存

##### 优点
1. 减少请求的个数
2. 节省带宽，避免浪费不必要的网络资源
3. 减轻服务器压力
4. 提高浏览器网页的加载速度，提高用户体验

##### 缓存分类
- 强缓存
1. 不会向服务器发送网络请求，直接从缓存中读取资源
2. 请求返回 200 的状态码

- 协商缓存
1. 向服务器发送请求，服务器会根据请求头的资源判断是否命中协商缓存
2. 如果命中，则返回304状态码通知浏览器从缓存中读取资源

- 共同点
1. 都是从浏览器端读取资源

- 不同点
1. 强缓存不发请求给服务器
2. 协商缓存发请求给服务器，根据服务器返回的信息决定是否使用缓存

##### 强缓存 header 参数
1. `expires`(http1.0时的规范)它的值为一个时间，在这时间前访问的，一直走缓存，在这个时间后才会走服务器。
> eg：面包的过期时间
2. `cache-control`(http1.1时的规范)主要是利用该字段的`max-age = number` 值来进行判断， 通过资源第一次的请求时间和`Cache-Control`设定的有效期，计算出一个资源过期时间， 再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则就不行。
> eg：面包的保质期

注：`cache-control`比`expires`权重高，所已通过`cache-contro = max-age = 0`可以清除强缓存。

##### 协商缓存 header 参数
向服务器发送请求，服务器会根据请求头的资源判断是否命中协商缓存，命中走缓存，状态码为:304(通知浏览器从缓存中读取资源)

- `Last-Modified` / `If-Modified-Since`
1. 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时加上`Last-Modified`表示这个资源在服务器上的最后修改时间。
2. 浏览器再次跟服务器请求这个资源时会加上`If-Modified-Since`表示上一次请求时返回的`Last-Modified`的值。
3. 服务器再次收到资源请求时，比较`Last-Modified`和`If-Modified-Since`如果没有变化则返回304走缓存， 否则服务器返回数据并更新`Last-Modified`的值。

- `Etag` / `If-None-Match`
1. 这两个值是由服务器生成的每个资源的唯一标识字符串，只要资源有变化就这个值就会改变。
2. 如果只是时间判断，频率过快就会出现问题，但是id不会出问题利用Etag能够更加准确的控制缓存。

---
