'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function (id) {
    var result = [];

    await sql('SELECT * FROM growingrecord where id = $1 order by diarydate desc ', [id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];
            } else {
                result = -1;
            }
        }, (error) => {
            result = null;
        });

    return result;
}

var one = async function (serno) {
    var result = [];
    
    await sql('SELECT * FROM growingrecord join baby on baby.babyno=growingrecord.babyno where serno = $1 ', [serno])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];                
            } else {
                result = -1;
            }
        }, (error) => {
            result = null;
        });

    return result;
}

var add = async function (newData) {
    var result;

    await sql('INSERT INTO growingrecord (babyno, height, weight, drinkmilk, recorddate) VALUES ($1, $2, $3, $4, $5)', [newData.babyno, newData.height, newData.weight, newData.drinkmilk, newData.recorddate])
        .then((data) => {
            result = 0;            
        }, (error) => {
            result = -1;            
        });

    return result;
}

var del = async function (serno) {
    var result;

    await sql('DELETE FROM growingrecord WHERE serno = $1', [serno])
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
var update = async function (newData) {
    var results;

    await sql('UPDATE growingrecord SET height=$1, weight=$2, drinkmilk=$3 WHERE serno = $4', [newData.height, newData.weight, newData.drinkmilk, newData.serno])
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
var search = async function (id, date) {    
    var d =new Date(date);    
    var yy = d.getFullYear();
    var mm = d.getMonth()+1;
    var dd = d.getDate();    
    var result = {};

    await sql('SELECT * FROM growingrecord join baby on baby.babyno=growingrecord.babyno join member on baby.id=member.id where member.id =$1 and extract(year from recorddate)=$2 and extract(month from recorddate)=$3 and extract(day from recorddate)=$4', [id, yy, mm, dd])
        .then((data) => {
            result.record = data.rows;
        }, (error) => {
            result = [];
        });

    //取回protype資料
    await sql('SELECT * FROM baby where id=$1', [id])
        .then((data) => {
            result.protype = data.rows;
        }, (error) => {
            result = [];
        });
    //回傳物件
    return result;
}

//---------------------------------------------
// search2
//---------------------------------------------
var search2 = async function (id, babyno) {
    var result = {};

    await sql('SELECT * FROM growingrecord join baby on baby.babyno=growingrecord.babyno where growingrecord.babyno=$1 order by growingrecord.recorddate desc', [babyno])
        .then((data) => {
            result.record = data.rows;
        }, (error) => {
            result = [];
        });

    //取回protype資料
    await sql('SELECT * FROM baby where id=$1', [id])
        .then((data) => {
            result.protype = data.rows;
        }, (error) => {
            result = [];
        });
    //回傳物件
    return result;
}

//------------------------------------------
// 取出型態資料
//------------------------------------------
var getDropdownData = async function (id) {
    //儲存下拉式選單資料  
    var result = {};    

    //取回protype資料
    await sql('SELECT * FROM baby where id=$1', [id])
        .then((data) => {
            result.protype = data.rows;
        }, (error) => {
            result = [];
        });

    await sql('SELECT * FROM growingrecord join baby on baby.babyno=growingrecord.babyno join member on baby.id=member.id where member.id =$1', [id])
        .then((data) => {
            result.record = data.rows;
        }, (error) => {
            result = [];
        });

    //回傳
    return result;
}

//匯出
module.exports = { list, one, add, del, update, search, getDropdownData, search2 };