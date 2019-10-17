var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const baby = require('./utility/baby');

//接收POST請求
router.post('/', function(req, res, next) {
    var babyno = req.body.babyno;
    console.log(babyno);

    var newData={
        babyno: babyno,
        name: req.body.name,
        birthday: req.body.birthday,
        photo: req.body.photo
    } 
    console.log(newData);
    baby.update(newData).then(d => {
        if (d>=0){
            d.birthday=moment(d.birthday).format("YYYY-MM-DD");
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