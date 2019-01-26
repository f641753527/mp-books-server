var db = require('../helper/db');


module.exports = async (ctx, next) => {
  const { pageindex, pagesize, openid } = ctx.request.query;
  try {

    const res = await db.query(`select books.*, users.user_info from books left join users on books.openid = users.open_id order by books.id asc`);

    let list = [];
      if (openid) {
        list = res.filter(v => v.openid === openid);
      } else {
        const page_total = Math.ceil((res.length / Number(pagesize)));
        const start = Number(pagesize) * Number(pageindex);
        list = pageindex === page_total - 1 ? res.slice(start) : res.slice(start, start + Number(pagesize));
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
