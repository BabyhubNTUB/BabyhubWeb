var express = require('express');
var router = express.Router();

//增加引用函式
const baby = require('./utility/baby');

//接收POST請求
router.post('/', function (req, res, next) {
    var userid = req.session.userid;
    
    var name = req.body.name;
    var gender = req.body.gender;
    var birthday = req.body.birthday;
    // 建立一個新資料物件
    var newData = {
        userid: userid,
        name: name,
        gender: gender, 
        birthday: birthday
    }
    console.log(newData);
    baby.add(newData).then(d => {
        if (d==0) {
            res.render('userSuccess');  //傳至成功頁面
        } else {
            res.render('userFail');     //導向錯誤頁面
            console.log("****************************");
        }
    })
});

module.exports = router;