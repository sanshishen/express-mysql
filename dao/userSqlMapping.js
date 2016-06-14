/**
 * CRUD SQL
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-14 13:56:01
 * @version 1.0.0
 */
'use strict';
var user = {
    insert: 'insert into user(id,name,age) values (0,?,?)',
    delete: 'delete from user where id=?',
    update: 'update user set name=?,age=? where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select * from user'
};
module.exports = user;