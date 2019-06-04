'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var articlelist = async function(){
    var result=[];
	
    await sql('SELECT * FROM "t04forum" LIMIT 4')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}


//匯出
module.exports = {articlelist};