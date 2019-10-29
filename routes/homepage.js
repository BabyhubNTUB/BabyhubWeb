var express = require('express');
var router = express.Router();

//增加引用函式
const articlelist = require('./utility/indexShowIn');

//接收GET請求
router.get('/', function (req, res, next) {
    var userid = req.session.userid;

    articlelist.list(userid).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.forum.length > 0) {
            data.username = req.session.username;
            res.render('homepage', { result: data });  //將資料傳給顯示頁面
        } else {
            res.render('notFound', { noti: noti });  //導向找不到頁面
        }
    })
});

module.exports = router;