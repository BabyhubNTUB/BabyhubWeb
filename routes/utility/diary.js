'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(id){
    var result={};
    
    await sql('SELECT * FROM diary where id = $1 order by diarydate desc ' ,[id])
        .then((data) => {
            if(data.rows.length >= 0){
                result.diary = data.rows;                   
            }else{
                result = -1;
            }    
        }, (error) => {
            result =[];
        });
		
    return result;
}

var one = async function(serno){
    var result=[];
    
    await sql('SELECT * FROM diary where serno = $1 ' ,[serno])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];                   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

var add = async function(newData){
    var result;

    await sql('INSERT INTO "diary" (id, diarydate, diary) VALUES ($1, $2, $3)', [newData.id, newData.diarydate, newData.diary])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

var del = async function(serno){
    var result;

    await sql('DELETE FROM diary WHERE serno = $1', [serno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 更新商品
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE diary SET diary=$1 WHERE serno = $2', [newData.diary, newData.serno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
//---------------------------------------------
// search
//---------------------------------------------
var search = async function(id,date){       
    var d =new Date(date);    
    var yy = d.getFullYear();
    var mm = d.getMonth()+1;
    var dd = d.getDate();     
    var result={};

        await sql('SELECT * FROM diary WHERE id=$1 and extract(year from diarydate)=$2 and extract(month from diarydate)=$3 and extract(day from diarydate)=$4',[id, yy, mm, dd])
            .then((data) => {     
                    result.diary = data.rows; 
            }, (error) => {
                result = [];                
            });
    //回傳物件
    return result;  
}

//匯出
module.exports = {list,one,add,del,update,search};