'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var one = async function(babyno){
    var result={};
    
    await sql('SELECT * FROM t02baby WHERE babyno = $1', [babyno])
        .then((data) => {
            if(data.rows.length > 0){
                result.baby = data.rows[0];   
            }else{
                result.baby = -1;
            }    
        }, (error) => {
            result.baby = null;
        });
    
        // await sql('SELECT * FROM t05forumcomment a, t01member b WHERE a.id=b.id and forumno = $1', [forumno])
        // .then((data) => {
        //     if(data.rows.length > 0){
        //         result.com = data.rows;   
        //     }else{
        //         result.com = -1;
        //     }    
        // }, (error) => {
        //     result.com = null;
        // });    

        // await sql('SELECT * FROM forum WHERE forumno = $1', [forumno])
        // .then((data) => {
        //     if(data.rows.length > 0){
        //         result.cnt = data.rows[0];   
        //     }else{
        //         result.cnt = -1;
        //     }    
        // }, (error) => {
        //     result.cnt = null;
        // });
    return result;
}

var list = async function(id){
    var result={};

    await sql('SELECT * FROM t01member where id like $1', [id])
    .then((data) => {            
        result.member = data.rows;  
    }, (error) => {
        result.member = [];
    });	
    
    await sql('SELECT * FROM t02baby where id like $1', [id])
    .then((data) => {            
        result.baby = data.rows;  
    }, (error) => {
        result.baby = [];
    });	
    // console.log(result);    
    return result;
}

//匯出
module.exports = {list,one};