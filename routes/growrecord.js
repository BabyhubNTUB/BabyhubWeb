var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');
var moment = require('moment');

//接收GET請求
router.get('/', function (req, res, next) {
  var id = req.session.userid;
  console.log(id);
  growingrecord.getDropdownData(id).then(d => {
    if (d != []) {
      
      for(var i=0; i<d.record.length; i++){
        d.record[i].recorddate=moment(d.record[i].recorddate).format("YYYY-MM-DD");
      }
      res.render('growrecord', { result: d });  //轉至新增頁面
    } else {
      res.render('userFail');     //導向錯誤頁面
    }
  });
});

module.exports = router; 