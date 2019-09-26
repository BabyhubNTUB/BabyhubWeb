var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/baby');

//接收POST請求
router.post('/', function(req, res, next) {
    var babyno = req.body.babyno;
    console.log(babyno);

    var newData={
        babyno:babyno,
        name: req.body.name,
        birthday: req.body.birthday
    } 
    console.log(newData);
    user.update(newData).then(d => {
        if (d>=0){
            res.render('userSuccess', {results:d});  //傳至成功頁面
            console.log('Success');
        }else{
            res.render('userFail');     //導向錯誤頁面
            console.log('fail');
        }  
    })
});

//匯出
module.exports = router;