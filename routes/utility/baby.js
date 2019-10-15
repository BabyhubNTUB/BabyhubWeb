'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var one = async function(babyno){
    var result={};
    console.log(babyno);

    await sql('SELECT * FROM t02baby where id like(SELECT id FROM t01member where id like (SELECT id FROM t02baby where babyno=$1))', [babyno])
    .then((data) => {            
        result.list = data.rows;  
    }, (error) => {
        result.list = [];
    });	
    
    await sql('SELECT * FROM t02baby where babyno=$1', [babyno])
    .then((data) => {            
        console.log("DB"+result);
        result.baby = data.rows;  
    }, (error) => {
        result.baby = [];
    });  

    await sql('SELECT * FROM t03growingrecord where babyno=$1 order by recorddate limit 10', [babyno])
    .then((data) => {            
        result.record = data.rows;  
    }, (error) => {
        result.record = [];
    }); 
    console.log(result);
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

var add = async function(newData){
    var result;

    await sql('INSERT INTO t02baby (id, name, gender,birthday) VALUES ($1, $2, $3, $4)', [newData.userid, newData.name, newData.gender, newData.birthday])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
            console.log("------------------------");
        });
		
    return result;
}

var del = async function(babyno){
    var result;

    await sql('DELETE FROM t02baby WHERE babyno = $1', [babyno])
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
    await sql('UPDATE t02baby SET name=$1, birthday=$2 WHERE babyno = $3', [newData.name, newData.birthday, newData.babyno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
            console.log('error');
        });
		
    return results;
}
//匯出
module.exports = {list,one,add,del,update};