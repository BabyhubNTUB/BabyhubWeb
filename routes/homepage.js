var express = require('express');
var router = express.Router();

//增加引用函式
const articlelist = require('./utility/indexShowIn');

//接收GET請求
router.get('/', function(req, res, next) {
    console.log('//////////////////////////');
    var userid = req.session.userid;
    console.log(userid);
    console.log('--------------------------');
    // console.log(id);
    articlelist.list(userid).then(data => {
        if(data==null){
            // console.log(data);
            res.render('error');  //導向錯誤頁面
        }else if(data.forum.length > 0){
            console.log(data);
            data.username = req.session.username;
            res.render('homepage', {result:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }
    })
});

module.exports = router;