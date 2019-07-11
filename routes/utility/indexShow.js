'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var list = async function(){
    var result={};
	
    await sql('SELECT * FROM t04forum LIMIT 4')
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.forum = [];
        });

	await sql('SELECT * FROM t10education LIMIT 4')
        .then((data) => {            
            result.education = data.rows;  
        }, (error) => {
            result.education = [];
        });

    await sql('SELECT * FROM t06pregnancyknowledge LIMIT 4')
        .then((data) => {            
            result.pregnancyknowledge = data.rows;  
        }, (error) => {
            result.pregnancyknowledge = [];
        });	
    // console.log(result);    
    return result;
}


//匯出
module.exports = {list};