var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');
const noti = require('./utility/notification');

//接收POST請求
router.post('/', function (req, res, next) {
    var id = req.body.id;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(id, password).then(d => {
        if (d == null) {
            req.session.userid = null;
            req.session.username = null;
            res.render('signInFail');  //傳至登入失敗
        } else {
            req.session.userid = d.id;
            req.session.username = d.username;
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('signInSuccess', { name: d.username, noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

module.exports = router;