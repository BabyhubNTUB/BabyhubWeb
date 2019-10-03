var express = require('express');
var router = express.Router();

//增加引用函式
const like = require('./utility/forumlike');

//接收POST請求
router.post('/', function (req, res, next) {
    var id = req.session.userid;
    var forumno = req.body.forumno;
    // 建立一個新資料物件
    var newData = {
        id: id,
        forumno: forumno
    }
    console.log(newData);
    like.like(newData).then(d => {
        if (d==0) {
            res.render('aforum');  //傳至成功頁面
            console.log("****************************");
        } else {
            res.render('userFail');     //導向錯誤頁面
        }
    })
});

module.exports = router;