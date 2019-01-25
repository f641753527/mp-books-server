const https = require('https');
const config = require('../config');
var db = require('../helper/db');

// 登录授权接口
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    const { userinfo, open_id } = ctx.request.body;

    await db.query('UPDATE users SET user_info = ? WHERE open_id = ?', [JSON.stringify(userinfo), open_id]);
    ctx.state.data = {
        msg: 'success'
    }
   
}
