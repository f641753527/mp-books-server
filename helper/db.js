var mysql = require('mysql');
const { sql } = require('../config')


// 创建 mysql 连接池资源
var pool = mysql.createPool({
    host     : sql.host,
    user     : sql.user,
    password : sql.pass,
    database : sql.db
});

exports.query = function(sql, arr){
    //建立链接
    return new Promise((resolve, reject) => {
        pool.getConnection((err,connection) => {
            if(err){throw err;return;}
            connection.query(sql, arr, (error,results,fields) => {
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
    
                if(error) throw error;
                resolve(results);
            });
        });
    })
};