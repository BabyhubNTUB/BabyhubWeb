var express = require('express');
var router = express.Router();

//增加引用函式
const articlelist = require('./utility/childEducation');
const noti = require('./utility/notification');

//接收GET請求
router.get('/', function (req, res, next) {
    var keyword = req.query.keyword;   //取出參數
    var check = req.query.check;

    articlelist.search(keyword).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.length >= 0) {
            if (check == 1) {
                var id = req.session.userid;
                noti.list(id).then(noti => {
                    if (noti == null) {
                        res.render('error');  //導向錯誤頁面
                    } else if (noti == -1) {
                        res.render('notFound', { noti: noti });  //導向找不到頁面                
                    } else {
                        res.render('childEducation', { items: data, noti: noti });  //將資料傳給顯示頁面
                    }
                })
            } else if (check == 2) {
                res.render('childEducation2', { items: data });  //將資料傳給顯示頁面
            } else {
                res.render('childEducation3', { items: data });  //將資料傳給顯示頁面
            }
        } else {
            if (check == 1) {
                var id = req.session.userid;
                noti.list(id).then(noti => {
                    if (noti == null) {
                        res.render('error');  //導向錯誤頁面
                    } else {
                        res.render('notFound', { noti: noti });  //導向找不到頁面                
                    }
                })
            } else if (check == 2) {
                res.render('notFound2');  //將資料傳給顯示頁面
            } else {
                res.render('notFound3');  //將資料傳給顯示頁面 
            }
        }
    })
});

module.exports = router;