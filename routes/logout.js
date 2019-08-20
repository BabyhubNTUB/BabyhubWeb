var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.id = null;
    req.session.username = null;           
    res.render('logout', {name:'已登出'});  //傳至登出    
});

module.exports = router;