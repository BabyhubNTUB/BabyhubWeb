var express = require('express');
var router = express.Router();

//增加引用函式
// var moment = require('moment');
const product = require('./utility/childEducation');

//接收GET請求
router.get('/:serno', function(req, res, next) {
    var serno = req.params.serno;   //取出參數

    product.two(serno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            // data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            res.render('achildEducation', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;
