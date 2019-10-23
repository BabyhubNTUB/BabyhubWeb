var express = require('express');
var router = express.Router();

//增加引用函式
const diary = require('./utility/diary');
var moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
  //var id = req.query.id;   //取出參數
  var userid = req.session.userid;
  console.log(userid);
  diary.list(userid).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data == -1) {
      res.render('notFound');  //導向找不到頁面                
    } else if (data.diary.length == 0) {
      console.log(data);
      res.render('diary', { item: data });  //將資料傳給顯示頁面
    } else {
      console.log(data);
      for (var i = 0; i < data.diary.length; i++) {
        data.diary[i].diarydate = moment(data.diary[i].diarydate).format("YYYY-MM-DD");
      }
      console.log(data);
      res.render('diary', { item: data });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;