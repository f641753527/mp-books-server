const https = require('https');
var db = require('../helper/db');

module.exports = async (ctx, next) => {
  const { isbn, open_id } = ctx.request.body;

  // 禁止重复添加
  const findRes = await db.query('select * from books where isbn = ?', [isbn]);

  if (findRes.length) {
    ctx.state = {
      code: -1,
      data: {
        msg: `图书已经存在`
      }
    }
    return;
  }


  const url = 'https://api.douban.com/v2/book/isbn/';
  const book = await getJSON(url + isbn);
  if (book) {
    const rate = book.rating.average;
    const { title, image, alt, publisher, summary, price } = book;
    const tags = book.tags.map(v => {
      return `${v.title} ${v.count}`;
    }).join(',');
    const authors = book.author.join(',');
    // 添加到数据库
    try {
      await db.query(
        `INSERT INTO books(isbn, openid, title, image, publisher, alt, summary, price, rate, tags, authors) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?) `,
        [isbn, open_id, title, image, publisher, alt, summary, price, rate, tags, authors]
      );
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch (error) {
      console.log(error.sqlMessage);
      ctx.state = {
        code: -1,
        data: {
          msg: `图书添加失败 ${error.sqlMessage}`
        }
      }
    }
  }
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = '';
      res.on('data', data => {
        urlData += data;
      });
      res.on('end', data => {
        const book = JSON.parse(urlData);
        if (book.title) {
          resolve(book);
        } else {
          reject(null);
        }
      });
    });
  });
}