var express = require('express');
var router = express.Router();

//增加引用函式
const register = require('./utility/user');

//接收POST請求
router.post('/', function (req, res, next) {
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var appellation = req.body.appellation;
    // 建立一個新資料物件
    var newData = {
        id: id,
        username: username,
        password: password,
        appellation: appellation
    }
    
    register.add(newData).then(d => {
        if (d==0) {
            res.render('registerSuccess');  //傳至成功頁面
        } else {
            res.render('registerFail');     //導向錯誤頁面
        }
    })
});

module.exports = router;