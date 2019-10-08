var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const diary = require('./utility/diary');

//接收POST請求
router.post('/', function(req, res, next) {
    var serno = req.body.serno;
    console.log(serno);

    var newData={
        serno: serno,
        diary: req.body.diary,
        diarydate: req.body.diarydate
    } 
    console.log(newData);
    diary.update(newData).then(d => {
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