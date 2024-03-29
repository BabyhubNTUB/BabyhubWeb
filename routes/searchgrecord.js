var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');
const noti = require('./utility/notification');
var moment = require('moment');


//接收GET請求
router.get('/', function (req, res, next) {
    var keyword = req.query.keyword;   //取出參數
    var id = req.session.userid;

    growingrecord.search(id, keyword).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.record.length >= 0) {
            for (var i = 0; i < data.record.length; i++) {
                data.record[i].recorddate = moment(data.record[i].recorddate).format("YYYY-MM-DD");
            }
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('growrecord', { result: data, noti: noti });  //將資料傳給顯示頁面
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