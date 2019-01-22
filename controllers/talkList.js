const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { pageindex, pagesize, openid } = ctx.request.query;
  try {
    const list = await mysql('talks')
                        .select('talks.*', 'cSessionInfo.user_info')
                          .join('cSessionInfo', 'talks.openid', 'cSessionInfo.open_id')
                            .orderBy('talks.id', 'desc');

    ctx.state.data = {
      list: list.map(v => {
        const user = JSON.parse(v.user_info);
        const pics = JSON.parse(v.pics);
        return Object.assign({}, v, {
          pics,
          user_info: {
            nickName: user.nickName,
            avatar: user.avatarUrl
          }
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
