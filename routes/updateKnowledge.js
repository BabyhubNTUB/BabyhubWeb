var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const pre = require('./utility/pregnancyKnowledge');

//接收GET請求
router.post('/', function(req, res, next) {
    var serno = req.body.serno;

    pre.three(serno).then(d => {
        if (d!=null && d!=-1){
            var data = {
                serno: d.serno,
                managerno: d.managerno,
                title: d.title,
                source: d.source, 
                content: d.content
            }
            res.render('updateKnowledge', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;