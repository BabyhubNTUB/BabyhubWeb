var express = require('express');
var router = express.Router();

//增加引用函式
const forum = require('./utility/forum');

//接收POST請求
router.post('/', function(req, res, next) {
    var forumno = req.body.forumno; 

    var newData={
        forumno:forumno,
        typeno: req.body.typeno,
        forumname: req.body.forumname,
        content: req.body.content
    } 
    console.log(newData);
    forum.update(newData).then(d => {
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