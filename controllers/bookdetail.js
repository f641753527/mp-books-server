const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  const { bookid } = ctx.request.query;

  const book = await mysql('books')
                      .select('books.*', 'cSessionInfo.user_info')
                      .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                      .where('id', bookid).first();





  const userinfo = JSON.parse(book.user_info);

  ctx.state.data = Object.assign({}, book, {
    tags: book.tags.split(','),
    summary: book.summary.split('\n'),
    userinfo: {
      nickName: userinfo.nickName,
      avatarUrl: userinfo.avatarUrl
    }
  });

  await mysql('books').where('id', bookid).increment('count', 1);
}