var express = require('express');
var router = express.Router();

const noti = require('./utility/notification');

//接收GET請求
router.get('/', function (req, res, next) {
  var username = req.session.username;;

  if (username == null || username == undefined) {
    username = '尚未登入';
  }

  var id = req.session.userid;
  noti.list(id).then(noti => {
    if (noti == null) {
      res.render('error');  //導向錯誤頁面
    } else if (noti == -1) {
      res.render('notFound', { noti: noti });  //導向找不到頁面                
    } else {
      res.render('signInSuccess', { username: username, noti: noti });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;