var express = require('express');
var router = express.Router();

//增加引用函式
const comment = require('./utility/comment');

//接收POST請求
router.post('/', function (req, res, next) {
    var userid = req.session.userid;
    var forumno = req.body.forumno;
    // var now = new Date();
    var content = req.body.content;

    // 建立一個新資料物件
    var newData = {
        userid: userid,
        forumno: forumno,
        // forumdatetime:  now,
        content: content
    }
    console.log(newData);
    comment.add(newData).then(d => {
        if (d==0) {
            res.render('userSuccess');  //傳至成功頁面
        } else {
            res.render('userFail');     //導向錯誤頁面
            console.log("****************************");
        }
    })
});

module.exports = router;