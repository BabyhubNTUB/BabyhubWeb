'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(){
    var result=[];
	
    await sql('SELECT * FROM education order by serno desc ')
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.forum = null;
        });
		
    return result;
}

//------------------------------------------
//小孩教育單篇文章
//------------------------------------------
var two = async function(serno){
    var result={};
    
    await sql('SELECT * FROM education WHERE serno = $1', [serno])
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

    await sql('INSERT INTO education (managerno, title, source,content) VALUES ($1, $2, $3, $4)', [newData.managerno, newData.title, newData.source, newData.content])
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

    await sql('DELETE FROM education WHERE serno = $1', [serno])
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

    await sql('UPDATE education SET title=$1, source=$2, content=$3 WHERE serno = $4', [newData.title, newData.source, newData.content, newData.serno])
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
var search = async function(keyword){   
    console.log("keyword: "+keyword)
      
        var result={};

        await sql('SELECT * FROM education WHERE title like $1',['%'+keyword+'%'])
            .then((data) => {            
                result.forum = data.rows;  
            }, (error) => {
                result.forum = [];
                console.log(keyword);
            });
            console.log(result);
    //回傳物件
    return result;  
}

//匯出
module.exports = {list,two,add,del,update,search};
