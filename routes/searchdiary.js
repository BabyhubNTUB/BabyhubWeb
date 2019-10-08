var express = require('express');
var router = express.Router();

//增加引用函式
const diary = require('./utility/diary');
var moment = require('moment');


//接收GET請求
router.get('/', function (req, res, next) {
    var keyword = req.query.keyword;   //取出參數
    var id = req.session.userid;

    diary.search(id, keyword).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
            console.log('error');
            console.log(data);
        } else if (data.diary.length > 0) {

            for (var i = 0; i < data.diary.length; i++) {
                data.diary[i].diarydate = moment(data.diary[i].diarydate).format("YYYY-MM-DD");
            }
            res.render('diary', { item: data });  //將資料傳給顯示頁面

        } else {
            res.render('notFound');  //導向找不到頁面
            console.log('notfound');
            console.log(data);
        }
    })
});

module.exports = router;