var express = require('express');
var router = express.Router();
//增加引用函式
const noti = require('./utility/notification');

/* GET home page. */
router.get('/', function (req, res, next) {
  var id = req.session.userid;
  noti.list(id).then(noti => {
    if (noti == null) {
      res.render('error');  //導向錯誤頁面
    } else {
      res.render('notfound', { noti: noti });  //將資料傳給顯示頁面
    }
  })
});

module.exports = router;
