/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
// const controllers = require('../controllers')
const login = require('../controllers/login')
const updateUser = require('../controllers/updateUser')
const addbook = require('../controllers/addbook')


router.post('/login', login);
router.post('/update_user', updateUser);
router.post('/addbook', addbook);


// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
// router.post('/upload', controllers.upload)

// // --- 信道服务接口 Demo --- //
// // GET  用来响应请求信道地址的
// router.get('/tunnel', controllers.tunnel.get)
// // POST 用来处理信道传递过来的消息
// router.post('/tunnel', controllers.tunnel.post)

// // --- 客服消息接口 Demo --- //
// // GET  用来响应小程序后台配置时发送的验证请求
// router.get('/message', controllers.message.get)
// // POST 用来处理微信转发过来的客服消息
// router.post('/message', controllers.message.post)

// router.post('/test', controllers.test)

// router.get('/test', controllers.test)

// // 扫码添加图书
// router.post('/addbook', controllers.addbook)

// // 获取图书列表
// router.get('/booklist', controllers.booklist)

// // 图书详情
// router.get('/bookdetail', controllers.bookdetail)

// // 排行榜列表
// router.get('/toplist', controllers.toplist)

// // 添加评论
// router.post('/addcomment', controllers.addcomment)

// // 评论列表
// router.get('/getCommentList', controllers.commentList)

// // 发朋友圈
// router.post('/publishTalk', controllers.publishTalk)

// // 获取朋友圈列表
// router.get('/talkList', controllers.talkList)

// // 获取点赞列表
// router.get('/talkLikes', controllers.talkLikes)

// // 点赞
// router.post('/likeTheTalk', controllers.likeTheTalk)

module.exports = router
