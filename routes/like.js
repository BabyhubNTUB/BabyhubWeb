var express = require('express');
var router = express.Router();

//增加引用函式
const like = require('./utility/forumlike');

//接收POST請求
router.post('/', function (req, res, next) {
    var userid = req.session.userid;
    var username = req.session.username;
    var forumno = req.body.forumno;
    // 建立一個新資料物件
    var newData = {
        userid: userid,
        username: username,
        forumno: forumno
    }
    console.log(newData);
    like.like(newData).then(d => {
        console.log('d');
        console.log(d);
        if (d==0) {
            res.render('userSuccess');  //傳至成功頁面
        } else {
            res.render('userFail');     //導向錯誤頁面
        }
    })
});

module.exports = router;