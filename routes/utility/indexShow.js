'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var list = async function(){
    var result={};
	
    await sql('SELECT * FROM forum order by forumno desc LIMIT 4')
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.forum = [];
        });

	await sql('SELECT * FROM education order by serno desc LIMIT 4')
        .then((data) => {            
            result.education = data.rows;  
        }, (error) => {
            result.education = [];
        });

    await sql('SELECT * FROM pregnancyknowledge order by serno desc LIMIT 4')
        .then((data) => {            
            result.pregnancyknowledge = data.rows;  
        }, (error) => {
            result.pregnancyknowledge = [];
        });	
    return result;
}


//匯出
module.exports = {list};