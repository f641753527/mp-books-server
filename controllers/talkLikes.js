const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { talkid } = ctx.request.query;

  try {
    const list = await mysql('talk_likes')
                        .select('talk_likes.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'talk_likes.openid', 'cSessionInfo.open_id')
                        .where('talkid', talkid);

    ctx.state.data = {
      list: list.map(v => {
        const user = JSON.parse(v.user_info);
        delete v.user_info;
        return Object.assign({}, v, {
          nickName: user.nickName
        });
      }),
      msg: 'success'
    };
  } catch(e) {
    ctx.state = {
      code: -1,
      data: {
        msg: e.sqlMessage
      }
    };
  }
}
