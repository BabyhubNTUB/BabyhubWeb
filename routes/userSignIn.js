var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var id = req.body.id;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(id, password).then(d => {
        if (d==null){
            req.session.id = null;
            req.session.username = null;           
            res.render('signInFail');  //傳至登入失敗
        }else{
            req.session.id = d.id;
            req.session.username = d.username;
            res.render('signInSuccess', {name:d.username});   //導向使用者
        }  
    })
});

module.exports = router;