var express = require('express');
var router = express.Router();

//增加引用函式
const forum = require('./utility/forum');

//接收POST請求
router.post('/', function(req, res, next) {
    var forumno = req.body.forumno;   //取得產品編號
    var check = req.body.check;
    
    forum.del(forumno).then(d => {
        if(d>=0){
            if (check == 1) {
                var id = req.session.userid;
                noti.list(id).then(noti => {
                    if (noti == null) {
                        res.render('error');  //導向錯誤頁面
                    } else if (noti == -1) {
                        res.render('notFound', { noti: noti });  //導向找不到頁面                
                    } else {
                        res.render('userSuccess', { results:d, noti: noti });  //將資料傳給顯示頁面
                    }
                })
            } else{
                res.render('managerSuccess', {results:d});  //將資料傳給顯示頁面
            }     
        }else{
            if (check == 1) {
                var id = req.session.userid;
                noti.list(id).then(noti => {
                    if (noti == null) {
                        res.render('error');  //導向錯誤頁面
                    } else if (noti == -1) {
                        res.render('notFound', { noti: noti });  //導向找不到頁面                
                    } else {
                        res.render('managerFail', { noti: noti });  //將資料傳給顯示頁面
                    }
                })
            } else{
                res.render('managerFail');  //將資料傳給顯示頁面
            }
        }
    })    
});

module.exports = router;

