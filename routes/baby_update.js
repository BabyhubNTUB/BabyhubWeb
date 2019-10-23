var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const baby = require('./utility/baby');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('photo'), function(req, res, next) {
    var babyno = req.body.babyno;
    console.log(babyno);

    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        // 傳入檔案不可超過maxSize
        if(req.file.size > maxSize){
            res.render('fileSizeError');  //圖片過大
            return;
        }                      
    }
    
    var photo;                           //用來存放圖片名稱
    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
        photo=req.file.filename;   //取得上傳照片名稱
    }

    var newData={
        babyno: babyno,
        name: req.body.name,
        birthday: req.body.birthday,
        photo: photo
    } 
    console.log(newData);
    baby.update(newData).then(d => {
        if (d>=0){
            d.birthday=moment(d.birthday).format("YYYY-MM-DD");
            console.log('Success');
            res.render('userSuccess', {results:d});  //傳至成功頁面
        }else{
            console.log('fail');
            res.render('userFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;