var db = require('../helper/db');

module.exports = async (ctx) => {

  const list = await db.query(`select id, title, image, count from books order by count desc limit 3`);
  
  ctx.state.data = {
    list: list
  };
}