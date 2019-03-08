var db = require('../helper/db');

module.exports = async (ctx, next) => {
  const { bookid, openid, comment, geo: location, phone } = ctx.request.body;

  try {

    await db.query(
      `insert into comments (bookid, openid, comment, phone, location)  values(?, ?, ?, ?, ?)`,
      [bookid, openid, comment, phone, location]
    );

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