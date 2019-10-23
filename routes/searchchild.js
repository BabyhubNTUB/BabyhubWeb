var express = require('express');
var router = express.Router();

//增加引用函式
const articlelist = require('./utility/childEducation');

//接收GET請求
router.get('/', function(req, res, next) {
    var keyword = req.query.keyword;   //取出參數
    var check = req.query.check;
    
    articlelist.search(keyword).then(data => {
            if(data==null){
                res.render('error');  //導向錯誤頁面
                console.log('error');
                console.log(data);
            }else if(data.forum.length >= 0){
                if(check==1){
                    res.render('childEducation', {items:data});  //將資料傳給顯示頁面
                }else if(check==2){
                    console.log('***********2');
                    console.log(data);
                    res.render('childEducation2', {items:data});  //將資料傳給顯示頁面
                }else{
                    console.log(data); 
                    res.render('childEducation3', {items:data});  //將資料傳給顯示頁面
                }
            }else{
                res.render('notFound');  //導向找不到頁面
                console.log('notfound');
                console.log(data);
            }
        })
});

module.exports = router;