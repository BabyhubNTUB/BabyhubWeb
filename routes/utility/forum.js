'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//討論區主頁
//------------------------------------------
var list = async function(){
    var result={};
	
    await sql('SELECT * FROM t15forumtype')
        .then((data) => {            
            result.type = data.rows;  
        }, (error) => {
            result.type = [];
        });

	await sql('SELECT * FROM forum')
        .then((data) => {            
            result.forum = data.rows;  
        }, (error) => {
            result.forum = [];
        });
    // console.log(result);    
    return result;
}

//------------------------------------------
//討論區單篇文章
//------------------------------------------
var one = async function(forumno){
    var result={};
    
    await sql('SELECT * FROM t04forum WHERE forumno = $1', [forumno])
        .then((data) => {
            if(data.rows.length > 0){
                result.aforum = data.rows[0];   
            }else{
                result.aforum = -1;
            }    
        }, (error) => {
            result.aforum = null;
        });
    
        await sql('SELECT * FROM t05forumcomment a, t01member b WHERE a.id=b.id and forumno = $1', [forumno])
        .then((data) => {
            if(data.rows.length > 0){
                result.com = data.rows;   
            }else{
                result.com = -1;
            }    
        }, (error) => {
            result.com = null;
        });    

        await sql('SELECT * FROM forum WHERE forumno = $1', [forumno])
        .then((data) => {
            if(data.rows.length > 0){
                result.cnt = data.rows[0];   
            }else{
                result.cnt = -1;
            }    
        }, (error) => {
            result.cnt = null;
        });
    return result;
}
var del = async function(serno){
    var result;

    await sql('DELETE FROM t04forum WHERE serno = $1', [serno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//---------------------------------------------
// search
//---------------------------------------------
var search = async function(keyword){   
    console.log("keyword: "+keyword)
      
        var result={};
	
        await sql('SELECT * FROM t15forumtype')
            .then((data) => {            
                result.type = data.rows;  
            }, (error) => {
                result.type = [];
            });
        await sql('SELECT * FROM forum WHERE forumname like $1',['%'+keyword+'%'])
            .then((data) => {            
                result.forum = data.rows;  
            }, (error) => {
                result.forum = [];
                console.log(keyword);
            });
    //回傳物件
    return result;  
}


//---------------------------------------------
// type
//---------------------------------------------
var type = async function(type){   
    console.log("type: "+type)
      
        var result={};
	
        await sql('SELECT * FROM t15forumtype')
            .then((data) => {            
                result.type = data.rows;  
            }, (error) => {
                result.type = [];
            });
        await sql('SELECT * FROM forum where typeno=$1', [type])
            .then((data) => {            
                result.forum = data.rows;  
            }, (error) => {
                result.forum = [];
                console.log(type);
            });
    //回傳物件
    return result;  
}
//匯出
module.exports = {list,one,del,search,type};