var express = require('express');
var router = express.Router();

//增加引用函式
// var moment = require('moment');
const product = require('./utility/baby');

//接收GET請求
router.get('/', function(req, res, next) {
    var userid = req.session.userid;
    articlelist.list(userid).then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.forum.length > 0){
            data.username = req.session.username;
            res.render('baby', {result:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }
    })
});


//接收GET請求
router.get('/:babyno', function(req, res, next) {
    var babyno = req.params.babyno;   //取出參數

    product.one(babyno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            // data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            res.render('baby', {result:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;
