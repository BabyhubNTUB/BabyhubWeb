'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var list = async function(id){
    var result={};
    console.log('**********************');
	console.log(id);
    var rowcnt =0;
    await sql('SELECT * FROM t09notification where id like $1 order by serno desc limit 3', [id])
    .then((data) => {
        if (data.rows.length > 0) {
            result = data.rows;
        } else if (data.rows.length == 0) {
            data.rows[0]={};
            data.rows[0].content = '目前沒有通知!';
            result = data.rows;
        } else {
            result = -1;
        } 
    }, (error) => {
        result = [];
    });

    console.log(result);    
    return result;
}

//匯出
module.exports = {list};
