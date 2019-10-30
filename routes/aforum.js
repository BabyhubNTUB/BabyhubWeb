var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const forum = require('./utility/forum');
const noti = require('./utility/notification');

//接收GET請求
router.get('/:forumno', function (req, res, next) {
    var forumno = req.params.forumno;   //取出參數

    forum.one(forumno).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else {
                    res.render('notFound', { noti: noti });  //導向找不到頁面
                }
            })
        } else {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    data.aforum.forumdate = moment(data.aforum.forumdate).format("YYYY-MM-DD");
                    res.render('aforum', { result: data, noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

module.exports = router;
