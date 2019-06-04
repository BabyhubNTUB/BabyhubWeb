'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query = async function(prono){
    var result={};
    console.log("*********");
    await sql('SELECT * FROM "t01member"')
        .then((data) => {
            console.log("*********");
            console.log(data.rows);
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                console.log("*********");
                console.log("-1");
                result = -1;
            }    
        }, (error) => {
            console.log("*********");
            console.log("null");
            result = null;
        });
		
    return result;
}

//匯出
module.exports = {query};
