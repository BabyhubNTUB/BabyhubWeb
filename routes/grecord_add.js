var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');
const noti = require('./utility/notification');

//接收POST請求
router.post('/', function (req, res, next) {
    var babyno = req.body.babyno;
    var height = req.body.height;
    var weight = req.body.weight;
    var drinkmilk = req.body.drinkmilk;
    var recorddate = new Date();
    // 建立一個新資料物件
    var newData = {
        babyno: babyno,
        height: height,
        weight: weight,
        drinkmilk: drinkmilk,
        recorddate: recorddate
    }

    growingrecord.add(newData).then(d => {
        if (d == 0) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound');  //導向找不到頁面                
                } else {
                    res.render('userSuccess', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        } else {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound');  //導向找不到頁面                
                } else {
                    res.render('userFail', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

module.exports = router;