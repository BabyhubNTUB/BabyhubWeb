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
        console.log(data.rowCount);
        rowcnt = data.rowCount;
        result.notification = data.rows; 
    }, (error) => {
        result.notification = [];
    });

    if (rowcnt == 0) {
        await sql('SELECT * FROM t09notification where serno=21')
        .then((data) => {
            result.notification = data.rows; 
        }, (error) => {
            result.notification = [];
        });
    }
    

    console.log(result);    
    return result;
}


//匯出
module.exports = {list};
