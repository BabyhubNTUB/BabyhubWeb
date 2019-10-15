'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var like = async function (newData) {
    var result = {};
    console.log(newData);
    var rowcnt = 0;
    var content = '';
    var addnot = 0;

    await sql('SELECT * FROM t11forumlike where id=$1 and forumno=$2', [newData.userid, newData.forumno])
        .then((data) => {
            console.log(data.rowCount);
            rowcnt = data.rowCount;
        }, (error) => {
            result = -1;
            console.log("------------------------3");
        });

    if (rowcnt == 0) {
        await sql('INSERT INTO t11forumlike (id, forumno) VALUES ($1, $2)', [newData.userid, newData.forumno])
            .then((data) => {
                content = newData.username + "按了你的貼文讚";
                addnot = 1;
            }, (error) => {
                result = -1;
                console.log(data);
                console.log("------------------------13");
            });
    } else if (rowcnt > 0) {
        await sql('DELETE FROM t11forumlike WHERE id = $1 and forumno = $2', [newData.userid, newData.forumno])
            .then((data) => {
                result = 0;
                console.log("------------------------20");
            }, (error) => {
                result = -1;
                console.log("------------------------22");
            });
        console.log("------------------------21");
    } else {
        result = -1;
        console.log(data);
        console.log("------------------------23");
    }

    if (addnot == 1) {
        await sql('INSERT INTO t09notification (id, content) VALUES ((SELECT id from t04forum WHERE forumno=$1), $2)', [newData.forumno, content])
            .then((data) => {
                result = 0;
                console.log("------------------------10");
            }, (error) => {
                result = -1;
                console.log(data);
                console.log("------------------------12");
            });
        console.log("------------------------11");
    }
    
    console.log(result);
    return result;
}
//匯出
module.exports = { like };