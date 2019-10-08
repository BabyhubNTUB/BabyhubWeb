var express = require('express');
var router = express.Router();

//增加引用函式
const edu = require('./utility/diary');

//接收POST請求
router.post('/', function (req, res, next) {
    var id = req.body.id;
    var diary = req.body.diary;
    var diarydate = new Date();
    // 建立一個新資料物件
    var newData = {
        id: id,
        diary: diary,
        diarydate: diarydate
    }
    console.log(newData);
    edu.add(newData).then(d => {
        if (d==0) {
            res.render('userSuccess');  //傳至成功頁面
        } else {
            res.render('userFail');     //導向錯誤頁面
            console.log("****************************");
        }
    })
});

module.exports = router;