'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var one = async function(babyno){
    var result={};

    await sql('SELECT * FROM baby where id like(SELECT id FROM member where id like (SELECT id FROM baby where babyno=$1))', [babyno])
    .then((data) => {            
        result.list = data.rows;  
    }, (error) => {
        result.list = [];
    });	
    
    await sql('SELECT * FROM baby where babyno=$1', [babyno])
    .then((data) => {            
        result.baby = data.rows[0];  
    }, (error) => {
        result.baby = [];
    });  

    await sql('SELECT * FROM growingrecord where babyno=$1 order by recorddate limit 10', [babyno])
    .then((data) => {            
        result.record = data.rows;  
    }, (error) => {
        result.record = [];
    });     
    return result;
}

var list = async function(id){
    var result={};

    await sql('SELECT * FROM member where id like $1', [id])
    .then((data) => {            
        result.member = data.rows;  
    }, (error) => {
        result.member = [];
    });	
    
    await sql('SELECT * FROM baby where id like $1', [id])
    .then((data) => {            
        result.baby = data.rows;  
    }, (error) => {
        result.baby = [];
    });	 
    return result;
}

var add = async function(newData){
    var result;
    var photo="baby.png";

    await sql('INSERT INTO baby (id, name, gender,birthday,photo) VALUES ($1, $2, $3, $4, $5 )', [newData.userid, newData.name, newData.gender, newData.birthday,photo])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;            
        });
		
    return result;
}

var del = async function(babyno){
    var result;

    await sql('DELETE FROM baby WHERE babyno = $1', [babyno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
var update = async function(newData){
    var results;    
    await sql('UPDATE baby SET name=$1, birthday=$2, photo=$3 WHERE babyno = $4', [newData.name, newData.birthday, newData.photo, newData.babyno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;            
        });
		
    return results;
}
//匯出
module.exports = {list,one,add,del,update};