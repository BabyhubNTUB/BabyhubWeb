var express = require('express');
var router = express.Router();

//增加引用函式
const diary = require('./utility/diary');
const noti = require('./utility/notification');
var moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
  //var id = req.query.id;   //取出參數
  var userid = req.session.userid;
  diary.list(userid).then(data => {
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
    } else if (data.diary.length == 0) {
      var id = req.session.userid;
      noti.list(id).then(noti => {
        if (noti == null) {
          res.render('error');  //導向錯誤頁面
        } else if (noti == -1) {
          res.render('notFound', { noti: noti });  //導向找不到頁面
        } else {
          res.render('diary', { item: data, noti: noti });  //將資料傳給顯示頁面
        }
      })

    } else {
      for (var i = 0; i < data.diary.length; i++) {
        data.diary[i].diarydate = moment(data.diary[i].diarydate).format("YYYY-MM-DD");
      }
      var id = req.session.userid;
      noti.list(id).then(noti => {
        if (noti == null) {
          res.render('error');  //導向錯誤頁面
        } else if (noti == -1) {
          res.render('notFound', { noti: noti });  //導向找不到頁面                
        } else {
          res.render('diary', { item: data, noti: noti });  //將資料傳給顯示頁面
        }
      })
    }
  })
});

module.exports = router;