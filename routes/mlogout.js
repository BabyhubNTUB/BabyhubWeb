var express = require('express');
var router = express.Router();

//增加引用函式
const manager = require('./utility/manager');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.managerno = null;
    req.session.username = null;           
    res.render('mlogout', {name:'已登出'});  //傳至登出    
});

module.exports = router;