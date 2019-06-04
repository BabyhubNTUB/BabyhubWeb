var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    //var id = req.query.id;   //取出參數
    var id='10456004@ntub.edu.tw';
    console.log(id);
    member.query(id).then(data => {
        
        console.log(data);
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            res.render('profile', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;