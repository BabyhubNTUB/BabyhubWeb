var express = require('express');
var router = express.Router();

//增加引用函式
const forum = require('./utility/forum');

//接收POST請求
router.post('/', function(req, res, next) {
    var forumno = req.body.forumno;   //取得產品編號
    console.log(forumno);
    forum.del(forumno).then(d => {
        if(d>=0){
            res.render('managerSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('managerFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;