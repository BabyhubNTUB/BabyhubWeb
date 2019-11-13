
var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    var managerno = req.session.managerno;; 

    if(managerno==null || managerno==undefined){
      managerno = '尚未登入';
    }

    res.render('msignInSuccess', { managerno: managerno });
});

module.exports = router;