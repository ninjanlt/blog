/**
 * <session 的流程>
 * 浏览器登录发送账号密码，服务端查用户库，校验用户
 * 服务端把用户登录状态存为 Session，生成一个 sessionId
 * 通过登录接口返回，把 sessionId set 到 cookie 上
 * 此后浏览器再请求业务接口，sessionId 随 cookie 带上
 * 服务端查 sessionId 校验 session
 * 成功后正常做业务处理，返回结果
 * 
 */

/**
 * <session 的实质>
 * express-session - npm 库封装了 session 的读写、加密、过期时间等
 * session 采用的是服务端集中存储，需要单独的存放在一个库中
 * session 需要考虑分布式的问题，让相同的 IP 请求负载均衡到一台服务器上，因为 session 不可跨域性
 * 
 */

const http = require("http");
const uuid = require('uuid/v1'); // 生成随字符串
const querystring = require("querystring");

// 存放 session
const session = {};

// 创建服务
http.createServer((req, res) => {
    if (req.url === "/user") {
        // 取出 cookie 存储的用户 ID
        let userId = querystring.parse(req.headers["cookie"], "; ")["study"];

        if (userId) {
            if (session[userId].studyCount === 0) res.end("您的学习次数已用完");
            session[userId].studyCount--;
        } else {
            // 生成 userId
            userId = uuid();

            // 将用户信息存入 session
            session[userId] = { studyCount: 30 };

            // 设置 cookie
            req.setHeader("Set-Cookie", [`study=${userId}`]);
        }

        // 响应信息
        res.end(`
            您的用户 ID 为 ${userId}，
            剩余学习次数为：${session[userId].studyCount}
        `);
    } else {
        res.end("Not Found");
    }
}).listen(3000);