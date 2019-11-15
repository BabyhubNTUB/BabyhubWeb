'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(){
    var result=[];
	
    await sql('SELECT * FROM pregnancyknowledge order by serno desc LIMIT 10 ')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//孕期知識
//------------------------------------------
var three = async function(serno){
    var result={};
    
    await sql('SELECT * FROM pregnancyknowledge WHERE serno = $1', [serno])
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

    await sql('INSERT INTO pregnancyknowledge (managerno, title, source,content) VALUES ($1, $2, $3, $4)', [newData.managerno, newData.title, newData.source, newData.content])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var del = async function(serno){
    var result;

    await sql('DELETE FROM pregnancyknowledge WHERE serno = $1', [serno])
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

    await sql('UPDATE pregnancyknowledge SET title=$1, source=$2, content=$3 WHERE serno = $4', [newData.title, newData.source, newData.content, newData.serno])
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
var search = async function(keyword){
        var result={};
        
        console.log(keyword)
        await sql('SELECT * FROM pregnancyknowledge WHERE title like $1',['%'+keyword+'%'])
            .then((data) => {    
                console.log(data.rows)
                if (data.rows.length > 0) {
                    result = data.rows;
                } else if (data.rows.length == 0) {
                    data.rows[0]={};
                    data.rows[0].title = '找不到符合的文章!';
                    result = data.rows;
                } else {
                    result = -1;
                }        
            }, (error) => {
                result= [];
            });
    //回傳物件
    return result;  
}
//匯出
module.exports ={list,three,add,del,update,search};