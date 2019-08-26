var express = require('express');
var router = express.Router();

//增加引用函式
const edu = require('./utility/childEducation');

//接收POST請求
router.post('/', function(req, res, next) {
    var serno = req.body.serno;

    var newData={
        serno:serno,
        managerno: req.body.managerno,
        title: req.body.title,
        source: req.body.source, 
        content: req.body.content
    } 
    console.log(newData);
    edu.update(newData).then(d => {
        if (d>=0){
            res.render('managerSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('managerFail');     //導向錯誤頁面
            console.log('fail');
        }  
    })
});

//匯出
module.exports = router;