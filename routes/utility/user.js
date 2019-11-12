'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var login = async function(id, password){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM "member" WHERE id=$1 and password=$2', [id, password])
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
    var photo="profile.png";

    await sql('INSERT INTO member (id, username, password,appellation,photo) VALUES ($1, $2, $3, $4)', [newData.id, newData.username, newData.password, newData.appellation,photo])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var del = async function(id){
    var result;
    await sql('DELETE FROM member WHERE id = $1', [id])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var update = async function(newData){
    var results;
    await sql('UPDATE member SET username=$1, password=$2, photo=$3 WHERE id = $4', [newData.username, newData.password, newData.photo, newData.id])
        .then((data) => {
            results = data.rowCount;
        }, (error) => {
            results = -1;            
        });

    return results;      

}
//匯出
module.exports = {login, add, del, update};