var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');
const noti = require('./utility/notification');

//---------------------------
// 引用multer外掛
//---------------------------
const multer = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
})

// 產生multer的上傳物件
var maxSize = 1024 * 1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage: storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('photo'), function (req, res, next) {
    var id = req.body.id;

    // 如果有選擇圖片
    if (typeof req.file != 'undefined') {
        // 傳入檔案不可超過maxSize
        if (req.file.size > maxSize) {
            res.render('fileSizeError');  //圖片過大
            return;
        }
    }

    var photo;                           //用來存放圖片名稱
    // 如果有選擇圖片
    if (typeof (req.file) != 'undefined') {
        photo = req.file.filename;   //取得上傳照片名稱
    }else{
        photo ='profile.png';
    }

    var newData = {
        id: id,
        password: req.body.password,
        username: req.body.username,
        photo: photo
    }
    user.update(newData).then(d => {
        if (d >= 0) {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('userSuccess', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        } else {
            var id = req.session.userid;
            noti.list(id).then(noti => {
                if (noti == null) {
                    res.render('error');  //導向錯誤頁面
                } else if (noti == -1) {
                    res.render('notFound', { noti: noti });  //導向找不到頁面                
                } else {
                    res.render('userFail', { noti: noti });  //將資料傳給顯示頁面
                }
            })
        }
    })
});

//匯出
module.exports = router;