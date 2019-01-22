const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { talkid, openid } = ctx.request.body;

  const res = await mysql('talk_likes').select().where('talkid', talkid).where('openid', openid);

  if (res.length) {
    // 取消点赞
    await mysql('talk_likes').delete().where('talkid', talkid).where('openid', openid);
  } else {
    await mysql('talk_likes').insert({ talkid, openid });
  }

  ctx.state.data = {
    msg: '操作成功'
  }

}