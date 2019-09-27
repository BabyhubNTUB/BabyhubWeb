var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const baby = require('./utility/baby');

//接收GET請求
router.get('/:babyno', function(req, res, next) {
    var babyno = req.params.babyno;   //取出參數

    baby.one(babyno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            data.birthday=moment(data.baby.birthday).format("YYYY-MM-DD")
            res.render('baby', {result:data});  //將資料傳給顯示頁面
            console.log(data);
        }  
    })
});

module.exports = router;
