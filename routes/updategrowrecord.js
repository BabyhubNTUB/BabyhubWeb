var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');
const noti = require('./utility/notification');
var moment = require('moment');

//接收GET請求
router.get('/:serno', function (req, res, next) {
  var serno = req.params.serno;
  growingrecord.one(serno).then(data => {
    if (data == null) {
      res.render('error');  //導向錯誤頁面
    } else if (data == -1) {
      res.render('notFound');  //導向找不到頁面                
    } else {
      data.recorddate = moment(data.recorddate).format("YYYY-MM-DD");
      var id = req.session.userid;
      noti.list(id).then(noti => {
        if (noti == null) {
          res.render('error');  //導向錯誤頁面
        } else if (noti == -1) {
          res.render('notFound');  //導向找不到頁面                
        } else {
          res.render('updategrowrecord', { item: data, noti: noti });  //將資料傳給顯示頁面
        }
      })
    }
  })
});

module.exports = router;