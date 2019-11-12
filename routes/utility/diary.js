'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(id){
    var result=[];
    console.log(id);
    
    await sql('SELECT * FROM diary where id = $1 order by diarydate desc ' ,[id])
        .then((data) => {
            if(data.rows.length > 0){
                result.diary = data.rows;   
                console.log("------------------------");
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

var one = async function(serno){
    var result=[];
    console.log(serno);
    
    await sql('SELECT * FROM diary where serno = $1 ' ,[serno])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
                console.log("------------------------");
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

    await sql('INSERT INTO diary (id, diarydate, diary) VALUES ($1, $2, $3)', [newData.id, newData.diarydate, newData.diary])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
            console.log("------------------------");
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
            console.log('error');
        });
		
    return results;
}
//---------------------------------------------
// search
//---------------------------------------------
var search = async function(id,date){   
    console.log("date: "+date)
      
        var result={};

        await sql('SELECT * FROM diary WHERE id=$1 And diarydate=$2',[id,date])
            .then((data) => {            
                result.diary = data.rows;  
            }, (error) => {
                result = [];
                console.log(date);
            });
    //回傳物件
    return result;  
}

//匯出
module.exports = {list,one,add,del,update,search};