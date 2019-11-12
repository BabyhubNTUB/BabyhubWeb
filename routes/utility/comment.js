'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//---------------------------------------------
// add
//---------------------------------------------
var add = async function (newData) {
    var result;
    var content;

    await sql('INSERT INTO forumcomment (forumno,id,content) VALUES ($1,$2,$3)', [newData.forumno, newData.userid, newData.content])
        .then((data) => {
            result = 0;
            content = newData.username + "在你的貼文下留言";
        }, (error) => {
            result = -1;
        });


    await sql('INSERT INTO notification (id, content, forumno) VALUES ((SELECT id from forum WHERE forumno=$1), $2, $3)', [newData.forumno, content, newData.forumno])
        .then((data) => {
            result = 0;            
        }, (error) => {
            result = -1;            
        });
    return result;
}

//---------------------------------------------
// del
//---------------------------------------------
var del = async function (serno) {
    var result;

    await sql('DELETE FROM forumcomment WHERE serno = $1', [serno])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });

    return result;
}

//匯出
module.exports = { add, del };