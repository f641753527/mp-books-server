const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { bookid, openid, comment, geo: location, phone } = ctx.request.body;

  try {
    await mysql('comments').insert({ bookid, openid, comment,location, phone });

    ctx.state.data = {
      msg: '评论成功',
    };


  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: `评论失败${e.sqlMessage}`
      }
    };
  }

}