var db = require('../helper/db');

module.exports = async (ctx) => {
  const { bookid, openid } = ctx.request.query;

  // const res = mysql('comments').select('comments.*', 'cSessionInfo.user_info')
  //                   .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')


  const res = await db.query(`select comments.*, users.user_info from comments left join users on comments.openid = users.open_id`);

  let list = [];
  if (bookid) {
    list = res.filter(v => v.bookid === bookid);
  } else {
    list = res.filter(v => v.openid === openid);
  }
                
  ctx.state.data = {
    list: list.map(v => {
      const info = JSON.parse(v.user_info);
      return Object.assign({}, v, {
        user_info: info
      });
    }),
    msg: 'success'
  };
}