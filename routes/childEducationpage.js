module.exports = router;

var express = require('express');
var router = express.Router();

//增加引用函式
const childEducation = require('./utility/childEducation');

//接收GET請求
router.get('/:pageNo', function(req, res, next) {
    var pageNo = Number(req.params.pageNo);  //頁碼, 轉數字

    // 如果輸入頁碼有誤
    if(isNaN(pageNo) || pageNo < 1){
        pageNo=1;
    }
   
    childEducation.page(pageNo).then(d => {
        if (d.data.length > 0){
            res.render('childEducationpage', {items:d});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;