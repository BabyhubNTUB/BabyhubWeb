var express = require('express');
var router = express.Router();

//增加引用函式
const pre = require('./utility/pregnancyknowledge');

//接收POST請求
router.post('/', function(req, res, next) {
    var serno = req.body.serno;   //取得產品編號
    console.log(serno);
    pre.del(serno).then(d => {
        if(d>=0){
            res.render('managerSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('managerFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;