var express = require('express');
var router = express.Router();

//增加引用函式
const growingrecord = require('./utility/growingrecord');

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
    console.log(newData);
    growingrecord.add(newData).then(d => {
        if (d==0) {
            res.render('userSuccess');  //傳至成功頁面
        } else {
            console.log("****************************");
            res.render('userFail');     //導向錯誤頁面
        }
    })
});

module.exports = router;