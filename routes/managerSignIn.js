var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/manager');

//接收POST請求
router.post('/', function(req, res, next) {
    var managerno = req.body.managerno;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(managerno, password).then(d => {
        if (d==null){
            req.session.managerno = null;
            req.session.name = null;           
            res.render('signInFail');  //傳至登入失敗
        }else{
            req.session.managerno = d.managerno;
            req.session.name = d.name;
            res.render('signInSuccess', {name:d.managerno});   //導向使用者
        }  
    })
});

module.exports = router;