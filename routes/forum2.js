var express = require('express');
var router = express.Router();

//增加引用函式
const articlelist = require('./utility/forum');
var moment = require('moment');

//接收GET請求
router.get('/', function(req, res, next) {
  articlelist.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.forum.length > 0){
            for (var i = 0; i < data.forum.length; i++) {
                data.forum[i].forumdate = moment(data.forum[i].forumdate).format("YYYY-MM-DD");
            }
            res.render('forum2', {result:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound2');  //導向找不到頁面
        }
    })
});

module.exports = router;