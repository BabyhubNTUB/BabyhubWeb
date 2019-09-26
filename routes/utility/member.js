'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

// //------------------------------------------
// //執行資料庫動作的函式-取出單一商品
// //------------------------------------------
// var query = async function(id){
//     var result={};
//     console.log("*********");
//     await sql('SELECT * FROM "t01member" WHERE id like $1', [id])
//         .then((data) => {
//             console.log("*********");
//             console.log(data.rows);
//             if(data.rows.length > 0){
//                 result = data.rows[0];   
//             }else{
//                 console.log("*********");
//                 console.log("-1");
//                 result = -1;
//             }    
//         }, (error) => {
//             console.log("*********");
//             console.log("null");
//             result = null;
//         });
		
//     return result;
// }
//------------------------------------------
//討論區單篇文章
//------------------------------------------
var query = async function(id){
    var result={};
    console.log(id);

    await sql('SELECT * FROM "t01member" WHERE id like $1', [id])
        .then((data) => {            
            result.user = data.rows;  
        }, (error) => {
            result.user = [];
        });
    
    await sql('SELECT * FROM "t02baby" WHERE id like $1', [id])
        .then((data) => {            
            result.baby = data.rows;  
        }, (error) => {
            result.baby = [];
        });   

        console.log(result);
    return result;
}

//匯出
module.exports = {query};
