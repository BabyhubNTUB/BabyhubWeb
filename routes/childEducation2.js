module.exports = router;

var express = require('express');
var router = express.Router();

//增加引用函式
const childEducation = require('./utility/childEducation');

//接收GET請求
router.get('/', function(req, res, next) {
    childEducation.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            res.render('childEducation2', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});


// //接收GET請求
// router.get('/:pageNo', function(req, res, next) {
//     var pageNo = Number(req.params.pageNo);  //頁碼, 轉數字
//     console.log('-------------------------------------------');
//     console.log(pageNo);
//     // 如果輸入頁碼有誤
//     if(isNaN(pageNo) || pageNo < 1){
//         pageNo=1;
//     }
//     console.log('*-------------------------------------------');
//     console.log(pageNo);
//     childEducation.page(pageNo).then(d => {
//         if (d.data.length > 0){
//             console.log('**-------------------------------------------');
//             console.log(d);
//             res.render('childEducation2', {items:d});  //將資料傳給顯示頁面
//         }else{
//             console.log('***-------------------------------------------');
//             res.render('notFound');  //導向找不到頁面
//         }  
//     })
// });

module.exports = router;