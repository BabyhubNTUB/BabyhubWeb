var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const forum = require('./utility/forum');

//接收GET請求
router.get('/:forumno', function(req, res, next) {
    var forumno = req.params.forumno;

    forum.one(forumno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            // data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            console.log(data);
            res.render('editmyforum', {result:data});  //將資料傳給顯示頁面
        }  
    })
    // forum.one(forumno).then(d => {
    //     if (d!=null && d!=-1){
    //         var data = {
    //             forumno: d.forumno,
    //             forumname: d.forumname,
    //             typeno: d.typeno,
    //             content: d.content
    //         }
    //         res.render('editmyforum', {result:data});  //將資料傳給更新頁面
    //     }else{
    //         res.render('notFound');  //導向找不到頁面
    //     }  
    // })
});

//匯出
module.exports = router;