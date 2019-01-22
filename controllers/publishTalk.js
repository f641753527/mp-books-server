const { mysql } = require('../qcloud');
const fs = require('fs');
const path = require('path');

module.exports = async (ctx, next) => {
  const { openid, talk, address } = ctx.request.body;
  let { pics } = ctx.request.body;
  pics = JSON.stringify(pics);
  const create_time = new Date().getTime();
  

  try {
    await mysql('talks').insert({ openid, talk, pics, address, create_time });

    ctx.state.data = {
      msg: '发表成功',
    };


  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: `发表失败${e.sqlMessage}`
      }
    };
  }
}