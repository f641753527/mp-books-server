var db = require('../helper/db');

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    db.query('select * from books', [], function(results,fields){
        //查询后的回调
        //Results代表是查询的结果，如果是插入修改等操作，则返回影响数据库信息的对象
        // fields代表查询的字段信息
    });
    ctx.state.data = {
        test: true,
        msg: 'mpvue 小程序'
    }
    ctx.state.data['time'] = Math.floor(Date.now() / 1000)
}
