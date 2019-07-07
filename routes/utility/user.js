'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var login = async function(id, password){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM "t01member" WHERE id=$1 and password=$2', [id, password])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            }else{
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;  
}
//---------------------------------------------
// 使用者註冊
//---------------------------------------------
var register = async function(newData){
    var result;

    await sql('INSERT INTO "t01member" (id, displayname, password) VALUES ($1, $2, $3)', [newData.id, newData.username, newData.password])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//匯出
module.exports = {login, register};