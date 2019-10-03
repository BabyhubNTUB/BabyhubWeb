'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');


//------------------------------------------
//寶寶資料
//------------------------------------------
var like = async function (newData) {
    var result = {};
    console.log(newData);

    await sql('SELECT * FROM t11forumlike where id=$1 and forumno=$2', [newData.id, newData.forumno])
        .then((data) => {
            console.log(data.rowCount);
            if (data.rowCount == 0) {
                sql('INSERT INTO t11forumlike (id, forumno) VALUES ($1, $2)', [newData.id, newData.forumno])
                    .then((data) => {
                        result = 0;
                        console.log("------------------------1");
                    }, (error) => {
                        result = -1;
                        console.log(data);
                        console.log("------------------------");
                    });
            } else if (data.rowCount > 0) {
                sql('DELETE FROM t11forumlike WHERE id = $1 and forumno=$2', [newData.id, newData.forumno])
                    .then((data) => {
                        result = data.rowCount;
                        console.log("------------------------2");
                    }, (error) => {
                        result = -1;
                        console.log("------------------------3");
                    });
            } else {
                result = -1;
                console.log(data);
                console.log("------------------------4");
            }
        }, (error) => {
            result = -1;
            console.log("------------------------5");
        });
    console.log(result);
    return result;
}
//匯出
module.exports = { like };