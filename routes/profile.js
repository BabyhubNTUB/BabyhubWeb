var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    //var id = req.query.id;   //取出參數
    var userid = req.session.userid;
    console.log(userid);
    member.query(userid).then(data => {
        if (data==null){
            console.log('1-------------------------------');
            res.render('error');  //導向錯誤頁面
        }else if(data.user.length > 0){
            data.username = req.session.username;
            console.log(userid);
            console.log(data);
            res.render('profile', {result:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
            console.log('notfound');
            console.log(data);
        }  
    })
});

module.exports = router;