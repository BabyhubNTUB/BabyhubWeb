var express = require('express');
var router = express.Router();

//增加引用函式
const pre = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var id = req.body.id;   //取得產品編號
    console.log(id);
    pre.del(id).then(d => {
        if(d>=0){
            res.render('userSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('userFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;