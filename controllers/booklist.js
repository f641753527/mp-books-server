const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { pageindex, pagesize, openid } = ctx.request.query;
  try {
    const res = mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                          .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                            .orderBy('books.id', 'desc');

    let list = [];
      if (openid) {
        list = await res.where('books.openid', openid);
      } else {
        list = await res.limit(Number(pagesize)).offset(Number(pagesize) * Number(pageindex));
      }

    
    ctx.state.data = {
      list: list.map(v => {
        const user = JSON.parse(v.user_info);
        return Object.assign({}, v, {
          user_info: {
            nickName: user.nickName
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
