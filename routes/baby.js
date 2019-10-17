var express = require('express');
var router = express.Router();

//增加引用函式
const baby = require('./utility/baby');
var moment = require('moment');


//接收GET請求
router.get('/:babyno', function (req, res, next) {
    var babyno = req.params.babyno;   //取出參數

    baby.one(babyno).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data == -1) {
            res.render('notFound');  //導向找不到頁面                
        } else {
            data.baby.birthday = moment(data.baby.birthday).format("YYYY-MM-DD");
            console.log(data);
            var date = [];
            var height = [];
            var weight = [];
            var drinkmilk =[];
            for (var i = 0; i < data.record.length; i++) {
                date.push(moment(data.record[i].recorddate).format("YYYY-MM-DD").toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }));
                height.push(data.record[i].height);
                weight.push(data.record[i].weight);
                drinkmilk.push(data.record[i].drinkmilk);
            }

            data.labels = date;
            data.datasets = [{
                label: '身長(公分)',
                data: height,
                fill: false,
                backgroundColor: 'rgba(133, 167, 217, 1)',
                borderColor: 'rgba(133, 167, 217, 1)'
            },
            {
                label: '體重(公斤)',
                data: weight,
                fill: false,
                backgroundColor: 'rgba(92, 132, 192, 1)',
                borderColor: 'rgba(92, 132, 192, 1)'
            },
            {
                label: '喝奶量(毫升)',
                data: drinkmilk,
                fill: false,
                backgroundColor: 'rgba(61, 104, 167, 1)',
                borderColor: 'rgba(61, 104, 167, 1)'
            }];
            res.render('baby', { result: data });  //將資料傳給顯示頁面
        }
    })
});

module.exports = router;
