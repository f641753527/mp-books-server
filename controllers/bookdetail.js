var db = require('../helper/db');

module.exports = async (ctx, next) => {
  const { bookid } = ctx.request.query;

  const books = await db.query(`select books.*, users.user_info from books left join users on books.openid = users.open_id where books.id = ?`, [bookid]);

  const book = books[0];

  const userinfo = JSON.parse(book.user_info);

  ctx.state.data = Object.assign({}, book, {
    tags: book.tags.split(','),
    summary: book.summary.split('\n'),
    userinfo: {
      nickName: userinfo.nickName,
      avatarUrl: userinfo.avatarUrl
    }
  });

  await db.query(`UPDATE books SET count=count+1 WHERE id = ?`, [bookid]);
}