var express = require('express');
var router = express.Router();

//增加引用函式
const pregnancyKnowledge = require('./utility/pregnancyKnowledge');
const noti = require('./utility/notification');

//接收GET請求
router.get('/', function (req, res, next) {
    pregnancyKnowledge.list().then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length > 0) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('pregnancyKnowledge', { items: data, noti: noti });  //將資料傳給顯示頁面
                }
            })
        } else {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else {
                    res.render('notFound', { noti: noti });  //導向找不到頁面
                }
            })
        }
    })
});

module.exports = router;