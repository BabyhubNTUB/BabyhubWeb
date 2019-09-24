'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// add
//---------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO t05forumcomment (content) VALUES ($1)', [newData.content])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//---------------------------------------------
// del
//---------------------------------------------
var del = async function(serno){
    var result;

    await sql('DELETE FROM t05forumcomment WHERE serno = $1', [serno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {add,del};