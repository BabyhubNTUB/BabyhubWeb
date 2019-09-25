var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var id = req.body.id;
    console.log(id);

    var newData={
        id:id,
        password: req.body.password,
        username: req.body.username
    } 
    console.log(newData);
    user.update(newData).then(d => {
        if (d>=0){
            res.render('userSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('userFail');     //導向錯誤頁面
            console.log('fail');
        }  
    })
});

//匯出
module.exports = router;