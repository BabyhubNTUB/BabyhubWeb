'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var like = async function (newData) {
    var result = {};    
    var rowcnt = 0;
    var content = '';
    var addnoti = 0;

    await sql('SELECT * FROM forumlike where id=$1 and forumno=$2', [newData.userid, newData.forumno])
        .then((data) => {            
            rowcnt = data.rowCount;
        }, (error) => {
            result = -1;            
        });

    if (rowcnt == 0) {
        await sql('INSERT INTO forumlike (id, forumno) VALUES ($1, $2)', [newData.userid, newData.forumno])
            .then((data) => {
                content = newData.username + "按了你的貼文讚";
                addnoti = 1;
            }, (error) => {
                result = -1;                
            });
    } else if (rowcnt > 0) {
        await sql('DELETE FROM forumlike WHERE id = $1 and forumno = $2', [newData.userid, newData.forumno])
            .then((data) => {
                result = 0;                
            }, (error) => {
                result = -1;                
            });        
    } else {
        result = -1;        
    }

    if (addnoti == 1) {
        await sql('INSERT INTO notification (id, content, forumno) VALUES ((SELECT id from forum WHERE forumno=$1), $2, $3)', [newData.forumno, content, newData.forumno])
            .then((data) => {
                result = 0;                
            }, (error) => {
                result = -1;               
            });        
    }
        
    return result;
}
//匯出
module.exports = { like };