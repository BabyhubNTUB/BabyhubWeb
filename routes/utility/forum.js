'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//討論區主頁
//------------------------------------------
var list = async function () {
    var result = {};

    await sql('SELECT * FROM forumtype')
        .then((data) => {
            result.type = data.rows;
        }, (error) => {
            result.type = [];
        });

    await sql('SELECT * FROM allforum order by forumno desc')
        .then((data) => {
            result.forum = data.rows;
        }, (error) => {
            result.forum = [];
        });
    // console.log(result);    
    return result;
}

//------------------------------------------
//討論區單篇文章
//------------------------------------------
var one = async function (forumno) {
    var result = {};

    await sql('SELECT * FROM forum WHERE forumno = $1', [forumno])
        .then((data) => {
            if (data.rows.length > 0) {
                result.aforum = data.rows[0];
            } else {
                result.aforum = -1;
            }
        }, (error) => {
            result.aforum = null;
        });

    await sql('SELECT * FROM forumcomment a, member b WHERE a.id=b.id and forumno = $1', [forumno])
        .then((data) => {
            console.log(data.rowCount);
            if (data.rows.length > 0) {
                result.com = data.rows;
            } else if (data.rowCount== 0) {
                data.rows[0]={};
                data.rows[0].username='';
                data.rows[0].content = '目前沒有留言!';
                data.rows[0].photo='';
                result.com = data.rows;
            } else {
                result.com = -1;
            }
        }, (error) => {
            result.com = null;
        });

    await sql('SELECT * FROM allforum WHERE forumno = $1', [forumno])
        .then((data) => {
            if (data.rows.length > 0) {
                result.cnt = data.rows[0];
            } else {
                result.cnt = -1;
            }
        }, (error) => {
            result.cnt = null;
        });

    await sql('SELECT * FROM forumtype ORDER BY typeno')
        .then((data) => {
            if (data.rows.length > 0) {
                result.type = data.rows[0];
            } else {
                result.type = -1;
            }
        }, (error) => {
            result.type = null;
        });
    return result;
}

var add = async function (newData) {
    var result;

    console.log(newData);
    await sql('INSERT INTO forum (id, forumname, typeno,content,forumdate) VALUES ($1, $2, $3, $4, $5)', [newData.userid, newData.forumname, newData.typeno, newData.content, newData.forumdate])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
            console.log("------------------------");
        });

    return result;
}

//---------------------------------------------
// del
//---------------------------------------------
var del = async function (forumno) {
    var result;

    await sql('DELETE FROM forum WHERE forumno = $1', [forumno])
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

    await sql('UPDATE forum SET forumname=$1, typeno=$2, content=$3 WHERE forumno = $4', [newData.forumname, newData.typeno, newData.content, newData.forumno])
        .then((data) => {
            results = data.rowCount;
        }, (error) => {
            results = -1;
            console.log('error');
        });

    return results;
}

//---------------------------------------------
// search
//---------------------------------------------
var search = async function (keyword) {
    console.log("keyword: " + keyword)

    var result = {};

    await sql('SELECT * FROM forumtype')
        .then((data) => {
            result.type = data.rows;
        }, (error) => {
            result.type = [];
        });
    await sql('SELECT * FROM allforum WHERE forumname like $1', ['%' + keyword + '%'])
        .then((data) => {
            result.forum = data.rows;
        }, (error) => {
            result.forum = [];
            console.log(keyword);
        });
    //回傳物件
    return result;
}


//---------------------------------------------
// type
//---------------------------------------------
var type = async function (type) {
    console.log("type: " + type)

    var result = {};

    await sql('SELECT * FROM forumtype')
        .then((data) => {
            result.type = data.rows;
        }, (error) => {
            result.type = [];
        });
    await sql('SELECT * FROM forum where typeno=$1', [type])
        .then((data) => {
            result.forum = data.rows;
        }, (error) => {
            result.forum = [];
            console.log(type);
        });
    //回傳物件
    return result;
}

//匯出
module.exports = { list, one, add, del, update, search, type };