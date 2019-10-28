var express = require('express');
var router = express.Router();

//增加引用函式
const edu = require('./utility/childEducation');

//接收POST請求
router.post('/', function (req, res, next) {
    var managerno = req.session.managerno;
    var title = req.body.title;
    var source = req.body.source;
    var content = req.body.content;
    // 建立一個新資料物件
    var newData = {
        managerno: managerno,
        title: title,
        source: source, 
        content: content
    }
    console.log(newData);
    edu.add(newData).then(d => {
        if (d==0) {
            res.render('managerSuccess');  //傳至成功頁面
        } else {
            res.render('managerFail');     //導向錯誤頁面
            console.log("****************************");
        }
    })
});

module.exports = router;