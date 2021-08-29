
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

##### 1.0
- 支持数据格式的多元化传输，方法增加了 `POST\HEAD`
- 请求端和响应端增加了头部字段
    - `Content-Type` 让响应数据不只限于超文本
    - `Expires`、`Last-Modified` 缓存头
    - `Authorization` 身份认证
    - `Connection: keep-alive` 支持长连接，但非标准
- 缺点就是无法复用链接，容易造成对头阻塞问题

##### 1.1
- 持久化链接，不需要每次再进行 `TCP` 链接，单链接复用
- 管线化，支持批量发送请求解决对头阻塞问题，但是响应数据还是按照请求的顺序响应，相当于解决了一半的问题
- 支持响应式分块，实现了流式渲染，减低白屏时间 `Transfer-Encoding:chunked`
- 增加 `Cache-Control ETag` 缓存头
- 增加 `PUT PATCH HEAD OPTIONS DELETE` 方法

##### 2.0
- 帧协议，将消息分为一个或多个帧，通过二进制数据传输最小单位
- 数据流，建立连接内的双向字节流，可以承载一条或多条消息
- 多路复用，建立起多个 `TCP` 链接进行传输
- 首部压缩，通过首部表跟踪的字段对于相同的数据不会频繁携带，只会发送差异化数据
- 服务端推送，允许服务器未经请求向客户端发送所需资源


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
- `multipart/form-data` 表单形式提交，既可以上传键值对也可以上传多个文件
- 文件上传时 `form` 表单必须要增加的属性 `enctype="multipart/form-data"`

```
# Request Payload
------WebKitFormBoundaryBRi81vNtMyBL97Rb
Content-Disposition: form-data; name="name"
```

- `application/x-www-from-urlencoded` 只能以键值对的数据格式提交

```
# Request Payload
name=tom&age=18
```

- `raw` 通常用于 `application/json` 可以上传 `text、javascript、html、xml` 格式

```
# Form Data
{"name": "tom", "age": 12}
```
- `binary` 只可以上传二进制数据 `application/octet-stream` 用来上传文件，一次只能上传一个文件
- `query` 参数包含在请求地址中，格式为 `../user?name=lxm`，用于 `GET` 请求

---

#### 队头阻塞
> Http 传输是基于一问一答的形式，报文必须是一发一收，这些任务会放在一个任务队列中，一旦队首的请求处理过慢，就会阻塞后面的请求处理

- 并发连接：对于一个域名允许分配多个长连接，那么相当于增加了任务队列，目前 `Chrome` 上限为 6 个
- 域名分片：一个域名可以并发 6 个长连接，那么多分几个域名，在当前域名分出多个二级域名，通过代理指向一台服务器，这样更好的解决了对头阻塞问题

---

#### Cookie

因为 `http/1.1` 是一种无状态的协议，服务器无法单从网路连接知道用户的身份，`cookie` 就是给客户端颁发一个通行证，通行证是唯一的，无论谁访问都要携带通行证，这样服务器能通过 `cookie` 来确认用户的身份了。

```js
// 请求头
Cookie: a=xxx;b=xxx
// 响应头
Set-Cookie: a=xxx
set-Cookie: b=xxx
```

`cookie` 实质上是一小段文本信息。客户端请求服务器，服务器会给客户端浏览器颁发一个 `cookie`，客户端会把 `cookie` 保存起来，当浏览器再请求该网站时，浏览器会把请求网址连同 `cookie` 一同提交给服务器，服务器会读取 `cookie` 信息，来辨别用户状态。服务器可以根据需要修改 `cookie` 的内容。

##### 生命周期
- `cookie` 的有效期可以通过 `Expires` 和 `Max-Age` 属性来设置
    - `Expires` 过期时间
    - `Max-Age` 从浏览器收到报文开始计算，时间间隔单位秒
- 若 `cookie` 过期，这个 `cookie` 会被删除，并不会发送给客户端

##### 缺陷
1. cookie 的不可跨域性
    - `cookie` 是由浏览器来管理的，浏览器能判断 `cookie` 所属域名。
    - 不同的域名不能互相操作彼此的 `cookie`
2. cookie 大小限制
    - `encodeURIComponent` 编码后的 `name=value` 对，大小不能超过 4kb
    - 每个域的 `cookie` 总数不得超过 `20+` 左右
3. 容易被客户端篡改，敏感信息不安全，移动端支持不友

##### 安全相关

- `path=/`，默认为当前路径，使 `cookie` 仅在该路径下可见。
- `domain=site.com`，默认 `cookie` 仅在当前域下可见，如果显式设置了域，可以使 `cookie` 在子域下也可见。
- `expires` 或 `max-age` 设置 `cookie` 过期时间，如果没有设置，则当浏览器关闭时 `cookie` 就失效了。
- `secure` 使 `cookie` 仅在 `HTTPS` 下有效。
- `samesite`，如果请求来自外部网站，禁止浏览器发送 `cookie`，这有助于防止 `XSRF` 攻击。

---

#### Session

使用 `cookie` 有一个非常大的局限性，如果 `cookie` 过多，无形中增加了客户端与服务端的数据传输量。由于浏览器对 `cookie` 数量的限制，注定不能在 `cookie` 中保存过多的信息，于是 `session` 出现
`session` 的作用就是在服务器端保存用户的数据，然后传递给用户一个名字就是 `JSESSIONID` 的 `cookie`，这个 `JESSIONID` 对应这个服务器中的一个 `session` 对象，通过它就可以获取到保存用户信息的 `session`

- `session` 是基于 `cookie` 实现的，`session` 储存在服务器端，`JESSIONID` 会被保存在客户端的 `cookie` 中

##### 使用

用户第一次请求服务器时，服务器根据用户提交的相关信息，创建对应的 `session` 请求返回时将 `JESSIONID` 返回给浏览器，并将此信息存在 `cookie` 当中，同时 `cookie` 会记录此 `JESSIONID` 属于哪个域名，当用户再次请求时此域名时，会将 `cookie` 中的信息也发给服务器，服务器再根据 `cookie` 中的 `JESSIONID` 查找对应的 `session` 信息，如果没有则用户登录失效

> Session的活化和钝化

`session` 机制很好的解决了 `cookie` 的不足，但是当访问应用的用户过多的时候，服务器会创建非常多 `session` 对象，如果不对这些 `session` 对象处理，那么 `session` 失效之前，这些 `session` 一直都会在服务器的内存中存在。于是 `session` 活化和钝化机制出现了。

- `session`钝化：`session` 在一段时间没有被使用时，会被当前存在的 `session` 对象序列化到磁盘上，而不再占用内存空间。
- `session`活化：`session` 被钝化后，服务器再次调用 `session` 对象时，将 `session` 对象由磁盘中加载到内存中使用。


##### cookie 与 session 区别
1. 安全性：`session` 比 `cookie` 安全，`session` 是储存在服务器端的，`cookie` 是存储在客户端的。
2. 存取值类型：`cookie` 只支持字符串的数据，`session` 可以存任意数据类型。
3. 有效期不同：`cookie` 可设置为长时间保持，比如默认登录功能，`session` 一般失效时间短，客户端的关闭或者 `session` 超时都会失效
4. 存储大小不同：单个 `cookie` 保存的数据不能超过4k，`session` 可存储数据高于 `cookie`，但是当访问量过多时，会占用服务器资源。

##### 使用 session 时需要考虑的问题
- 将`session`存储在服务器里，当用户同时在线量比较多时，这些`session`会占用大量内存，需要服务器定期清理`session`
- 当网站采用集群部署时，`session`不可共享因为是由单一服务器创建的，但是处理用户的请求不一定是创建的服务器
- 当需要共享 `session` 时，还会遇到跨域问题，需要应用做好 `cookie` 跨域处理
- 如果浏览器禁止`cookie`并且还想用`session`，需要在 `url` 后面加上 `JESSIONID`，不推荐
- 移动端支持不友好

--- 

#### Token
客户端初次登录，服务端收到请求去验证身份，成功后会签发一个 `token` 并把 `token` 发送给客户端，客户端收到 `token` 以后会把它保存在 `cookie` 或者 `localStorage` 里，每一次请求都需要携带 `token`，需要把 `token` 放在 `HTTP` 的 `header.authorization` 里，这是一种服务端无状态的认证方式，服务端不需要存放 `token` 数据，用解析 `token` 的时间换取 `session` 的存储空间，从而减小服务器的压力，`token`完全由应用管理，所以它可以避开同源策略。

##### Access token
- 简单`token`的组成：uid用户身份唯一标识，time当前时间戳，sign签名通过hash算法压缩成长度16进制的字符串
- 特点：服务器无状态化，可扩展性好，支持移动端设备，安全支持跨域

##### Refresh token
专门用来刷新 `access token`，如果没有 `refresh token` 也可以刷新 `access token` 但每次刷新都要用户输入登录用户名和密码，有了 `refresh token` 可以减少这个麻烦，客户端直接用 `refresh token` 去更新 `access token`，无需用户额外操作。

- 实质：`access token`有效期较短，当`access token`过期时，通过 `refresh token` 来获取新的 `token`，如果 `refresh token` 也过期了，用户只能重新登录
- 特性：`refresh token` 及过期时间是存储在数据库中，只有在申请新的 `access token` 时才会验证，不会对服务器造成大量请求压力


##### JSON WebToken
1. 是什么?
- `Token`是在服务端将用户信息经过`Base64Url`编码过后传给在客户端，每次用户请求的时候都会带上这一段信息，因此服务端拿到此信息进行解密后就知道此用户是谁了，这个方法叫做`JWT(Json Web Token)`

2. 为什么要用token？
- 简洁：可以通过`URL`，`POST`参数或者是在`HTTP`头参数发送，因为数据量小，传输速度也很快
- 自包含：由于串包含了用户所需要的信息，避免了多次查询数据库
- 因为`Token`是以`JSON`的形式保存在客户端的，所以`JWT`是跨语言的

3. 怎么使用？

```js
const jwt = require('jsonwebtoken')

// 根据id值, 固定密钥, 有效时间加密生成token
const token = jwt.sign({ id: '123' }, 'secret', { expiresIn: '10 s' })

// 根据固定密钥解密token
const decoded = jwt.decode(token, 'secret')
console.log('-----', decoded)
```

---

#### Storage
- `localStorage` 是持久化的本地存储，永远不会过期，除非手动删除
- `sessionStorage` 是临时性的本地存储，在会话结束时(关闭页面)，存储的内容就被释放

##### 作用域
- `Local Storage`、`Session Storage` 和 `Cookie` 都遵循同源策略
- 但 `Session Storage` 有特殊之处，即便是相同域名下的两个页面，只要它们不在浏览器的同一个 `Tab` 中打开，那么它们的 `Session Storage` 内容便无法共享

##### 优点
- 存储容量大：不同浏览器，存储容量可以达到 `5-10M`，针对一个域名
- 存储于客户端，不会服务端发生通信

##### 缺点
- 只能存储字符串，`JSON`对象需要转换为 `JSON string` 存储
- 只适用于存储少量简单数据
- `localStorage` 需要手动删除

##### 应用
- `Storage` 事件，在调用 `setItem`，`removeItem`，`clear` 方法后触发
- 获取时是 `JSON` 格式，每次都需要进行格式转换 `JSON.parse()`

```js
localStorage.setItem(key,value)
localStorage.getItem(key)
localStorage.removeItem(key)
localStorage.clear()
localStorage.key(index)
```

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

#### 浏览器页面请求过程
1. 先去做DNS解析，通过DNS服务器拿到该域名的对应的IP，先从本地DNS服务器中查找有没有缓存记录，如果有的话就直接得到，没有情况下会依次向根服务器、顶级域名服务器、权威域名服务器发送查询请求，通过这种迭代方式找到最终的记录，把这个结果返回用户
2. 用户再向`IP`服务器发送数据请求，在请求之前先做`Tcp/Ip`连接，连接的时候会执行三次握手，向服务端建立连接会发送带有`SYN`标识符，服务端收到后会返回`SYN/ACK`标识，客户端收到后会返回`ACK`标识，握手完毕后发送请求，浏览器将`http`报文进行层层封装，通过网络传递给服务器，服务器会做层层的解包，最终将数据发送给指定的端口
3. 到指定端口后对应的服务软件会对请求报文做一些处理，一般都是`nodejs`把这个请求接到再通过js代码对数据做一些处理，如果是静态资源会走文件系统查看一下文件是否存在，如果存在的话就读取文件内容，然后返回给客户端浏览器，如果是一个动态请求的话会进行数据库的连接，数据库会返回给js然后再对数据做一些处理
4. 比如`json`的格式化或者是`html`的拼接，最终再将这个结果返回给浏览器，再通过数据包跟之前一个样子打包再层层解包返回给浏览器，浏览器在接到这个响应之后会进行解析，会先扫描这个文档内的资源，然后再对服务器请求这些资源，边解析边做dom树的生成
5. `html`字符流解析分为两种词法解析和语法解析，解析完毕会对数据流做dom树的构建，在解析的过程中也会对`css`文件进行解析生成`css`样式树，最终将`dom\css`树进行合并生成渲染树
6. 然后根据GPU渲染引擎进行绘制，通过显卡将内容绘制到屏幕上，绘制完毕后浏览器会和服务器进行四次挥手，当服务器确定接收完后断开连接。

---

#### 页面渲染过程
1. 浏览器解析器接收到网络资源后解析 `html` 并构建 `dom` 树 
    - 浏览器收到字节数据，会根据字节数据转换为字符串
    - 将这些字符串通过词法分析转换为标记（token），这一过程词法分析中叫做标记化（tokenization）
    - 标记转换为 `node`，根据不同的节点之间的联系构建 `dom` 树
    - 在解析 `html` 文件时候，当遇到 `css` 和 `js` 文件，浏览器会去下载解析这些资源文件，阻塞渲染

2. 解析 `css` 构建样式树
    - 浏览器会通过递归方式确定每一个节点是什么样式，消耗性能
    - 尽量避免多层次的选择器，减少无意义的标签

3. 合并 `dom/css` 树生成渲染树
    - 渲染树只会包括需要显示的节点
    - 不显示的节点 `display:none\script\link\meta` 等

4. 回流
    - 根据生成的渲染树，从渲染根节点开始遍历，计算每一个元素的几何信息

5. 重绘
    - 最终得到所有可见的节点以及元素的几何信息，然后将渲染树每个节点转换成屏幕上的像素点

##### 总结
1. `JS` 与 `CSS` 都是阻塞页面渲染的资源
2. 可以通过媒体查询解除解决 `CSS` 在特定场景阻塞的问题
3. 可通过为 `script` 添加异步属性来防止阻塞

补充： `CSS` 可以通过打包工具转化成 `js`，在页面加载时，通过异步加载 `js` 资源，然后应用样式。这也是可以防止 `css` 阻塞渲染的一种方式

---


