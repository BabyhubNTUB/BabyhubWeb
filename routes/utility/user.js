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
var add = async function(newData){
    var result;

    await sql('INSERT INTO t01member (id, username, password,appellation) VALUES ($1, $2, $3, $4)', [newData.id, newData.username, newData.password, newData.appellation])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var del = async function(id){
    var result;
    await sql('DELETE FROM t01member WHERE id = $1', [id])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var update = async function(newData){
    var results;
    console.log("==========================");
    console.log(newData);
    await sql('UPDATE t01member SET username=$1, password=$2 WHERE id = $3', [newData.username, newData.password,newData.id])
        .then((data) => {
            results = data.rowCount;
        }, (error) => {
            results = -1;
            console.log('error');
        });

    return results;      

}
//匯出
module.exports = {login, add, del, update};