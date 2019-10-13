'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var like = async function (newData) {
    var result = {};
    console.log(newData);

    await sql('SELECT * FROM t11forumlike where id=$1 and forumno=$2', [newData.userid, newData.forumno])
        .then((data) => {
            console.log(data.rowCount);
            if (data.rowCount == 0) {
                sql('INSERT INTO t11forumlike (id, forumno) VALUES ($1, $2)', [newData.userid, newData.forumno])
                    .then((data) => {
                        result = 0;
                        var content=newData.username+"按了你的貼文讚";
                        sql('INSERT INTO t09notification (id, content) VALUES ((SELECT id from t04forum WHERE forumno=$1), $2)', [newData.forumno, content])
                            .then((data) => {
                                result = 0;
                                console.log("------------------------1");
                            }, (error) => {
                                result = -1;
                                console.log(data);
                                console.log("------------------------");
                            });
                        console.log("------------------------1");
                    }, (error) => {
                        result = -1;
                        console.log(data);
                        console.log("------------------------");
                    });
            } else if (data.rowCount > 0) {
                sql('DELETE FROM t11forumlike WHERE id = $1 and forumno = $2', [newData.userid, newData.forumno])
                    .then((data) => {
                        result = data.rowCount;
                        console.log("------------------------2");
                    }, (error) => {
                        result = -1;
                        console.log("------------------------");
                    });
                    console.log("------------------------2");
            } else {
                result = -1;
                console.log(data);
                console.log("------------------------");
            }
        }, (error) => {
            result = -1;
            console.log("------------------------");
        });
    console.log(result);
    return result;
}
//匯出
module.exports = { like };