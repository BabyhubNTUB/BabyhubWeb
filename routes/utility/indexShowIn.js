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

    await sql('SELECT * FROM t01member where id like $1', [id])
    .then((data) => {            
        result.member = data.rows;  
    }, (error) => {
        result.member = [];
    });	
    
    await sql('SELECT * FROM t02baby where id like $1', [id])
    .then((data) => {            
        result.baby = data.rows;  
    }, (error) => {
        result.baby = [];
    });	

    await sql('SELECT * FROM t09notification where id like $1 order by serno desc limit 3', [id])
    .then((data) => {            
        result.notification = data.rows;  
    }, (error) => {
        result.notification = [];
    });
    console.log(result);    
    return result;
}


//匯出
module.exports = {list};
