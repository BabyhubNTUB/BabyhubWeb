var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');
const noti = require('./utility/notification');
var moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
  var id = req.session.userid;
  growingrecord.getDropdownData(id).then(d => {
    console.log(d);
    if (d != []) {
      for (var i = 0; i < d.record.length; i++) {
        d.record[i].recorddate = moment(d.record[i].recorddate).format("YYYY-MM-DD");
      }
      noti.list(id).then(noti => {
        if (noti == null) {
          res.render('error');  //導向錯誤頁面
        } else if (noti == -1) {
          res.render('notFound', { noti: noti });  //導向找不到頁面                
        } else {
          res.render('growrecord', { result: d, noti: noti });  //將資料傳給顯示頁面
        }
      })
    } else {
      res.render('userFail');     //導向錯誤頁面
    }
  });
});

module.exports = router; 