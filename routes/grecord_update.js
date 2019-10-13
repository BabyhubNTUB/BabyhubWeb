var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const growingrecord = require('./utility/growingrecord');

//接收POST請求
router.post('/', function(req, res, next) {
    var serno = req.body.serno;
    console.log(serno);

    var newData={
        serno: serno,
        recorddate: req.body.recorddate,
        height: req.body.height,
        weight: req.body.weight,
        drinkmilk: req.body.drinkmilk
    } 
    console.log(newData);
    growingrecord.update(newData).then(d => {
        if (d>=0){
            console.log('Success');
            res.render('userSuccess', {results:d});  //傳至成功頁面
        }else{
            console.log('fail');
            res.render('userFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;