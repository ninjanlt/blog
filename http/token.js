/**
 * <token 的流程>
 * 用户登录，服务端校验账号密码，获得用户信息
 * 把用户信息、token 配置编码成 token，通过 cookie set 到浏览器
 * 此后用户请求业务接口，通过 cookie 携带 token
 * 接口校验 token 有效性，进行正常业务接口处理
 * 
 */

/**
 * <token 的实质>
 * token 的编码采用 hash 算法进行转译成 16位 base64 形式
 * 如果用户对 token 的数据进行反编译更改后再转为 base64 也是对 token 的篡改
 * 解决方案：添加数字签名 JWT
 * 
 */

// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
    }

    // 生成token
    generateToken() {
        let data = this.data;
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem')); // 私钥 可以自己生成
        let token = jwt.sign({
            data,
            exp: created + 60 * 30,
        }, cert, { algorithm: 'RS256' });
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem')); // 公钥 可以自己生成
        let res;
        try {
            let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
            let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}

module.exports = Jwt;

// 使用
router.post('/login', (req, res) => {
    // 获取用户的 ID 信息
    let id = req.body.user.id
    let jwt = new Jwt(id)
    let token = jwt.generateToken()
    res.send({ status: 200, token: token })
})
