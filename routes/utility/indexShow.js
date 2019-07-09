'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// 
//---------------------------------------------
var list = async function(){
    var result={};
	
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
    // console.log(result);    
    return result;
}

//------------------------------------------
//討論區
//------------------------------------------
var one = async function(forumno){
    var result={};
    
    await sql('SELECT * FROM t04forum WHERE forumno = $1', [forumno])
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

//------------------------------------------
//小孩教育
//------------------------------------------
var two = async function(serno){
    var result={};
    
    await sql('SELECT * FROM t10education WHERE serno = $1', [serno])
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

//------------------------------------------
//孕期知識
//------------------------------------------
var three = async function(serno){
    var result={};
    
    await sql('SELECT * FROM t06pregnancyknowledge WHERE serno = $1', [serno])
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

//匯出
module.exports = {list,one,two,three};