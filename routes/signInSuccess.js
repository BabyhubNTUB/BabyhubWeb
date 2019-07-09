// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('signInSuccess', { title: 'Express' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    var username = req.session.username;; 

    if(username==null || username==undefined){
      username = '尚未登入';
    }

    res.render('signInSuccess', { username: username });
});

module.exports = router;