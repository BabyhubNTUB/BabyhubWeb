'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//討論區單篇文章
//------------------------------------------
var query = async function(id){
    var result={};
    console.log(id);

    await sql('SELECT * FROM "member" WHERE id like $1', [id])
        .then((data) => {            
            result.user = data.rows[0];  
        }, (error) => {
            result.user = [];
        });
    
    await sql('SELECT * FROM "baby" WHERE id like $1', [id])
        .then((data) => {            
            result.baby = data.rows;  
        }, (error) => {
            result.baby = [];
        });   

    await sql('SELECT * FROM "forum" WHERE id like $1', [id])
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.user = [];
        });
        
        console.log(result);
    return result;
}

//匯出
module.exports = {query};
