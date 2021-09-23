/**
 * <cookie 的诞生>
 * 因为 http 是一种无状态的协议，服务器无法单从网路连接知道用户的身份
 * cookie 就是给客户端颁发一个通行证，通行证是唯一的
 * 无论谁访问都要携带通行证，这样服务器能通过 cookie 来确认用户的身份了。
 * 
 */

/**
 * <cookie 的实质>
 * cookie 实质上是一小段文本信息。
 * 客户端请求服务器，服务器会给客户端浏览器颁发一个 cookie，客户端会把 cookie 保存起来，
 * 当浏览器再请求该网站时，浏览器会把请求网址连同 cookie 一同提交给服务器，
 * 服务器会读取 cookie 信息，来辨别用户状态。服务器可以根据需要修改 cookie 的内容。
 * 
 */

/**
 * <cookie 的生命周期>
 * cookie 可以通过 Expires、Max-Age 来指定有效存在时间
 *  Expires 过期时间
 *  Max-Age 指定固定期限，从接收报文开始计算
 * 如果同时设置了这两个 Max-Age 优先级高于 Expires
 * 如果没有设置 cookie 期限那么当前 cookie 属于会话级别 session cookie 关闭此前对话删除
 * 
 */

/**
 * <cookie 的缺陷>
 * cookie 的不可跨域性，只在当前域名下有效包含子域名
 * cookie 的大小限制，使用 encodeURIComponent 方法编码后的键值对大小不能超过 4kb
 * 每个域名下 cookie 数量不能超过 20，容易被客户端篡改，信息不安全
 * 
 */

/**
 * <cookie 的操作>
 * path=/home 指定当前 cookie 只在哪个路径下展示
 * domain=site.com 指定当前 cookie 在当前域名下生效
 * Expires=Wed, 21 Oct 2015 07:28:00 GMT; 指定 cookie 的有效日期
 * secure; 指定 cookie 只在 https 协议下生效
 * HttpOnly; 指定 cookie 不能通过 js 脚本获取
 * 
 */

const cookie = `Set-Cookie: username=jimu; domain=jimu.com; path=/blog; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`;
document.cookie = cookie;

const http = require('http');
http.createServer((req,res)=>{
    res.setHeader("Set-Cookie", [
        "name=panda; domain=panda.com; path=/write; httpOnly=true",
        `age=28; Expires=${new Date(Date.now() + 1000 * 10).toGMTString()}`,
        `address=${encodeURIComponent("回龙观")}; max-age=10`
    ]);
    res.end("Write ok");
}).listen(8009);