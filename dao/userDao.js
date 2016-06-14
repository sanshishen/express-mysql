/**
 * interact with mysql
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-14 14:01:30
 * @version 1.0.0
 */
'use strict';
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// use connection pool
var pool = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: 'operation failed'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // get parameters from front end.
            var param = req.query || req.params;
            console.log(param);
            //var param1 = $util.clone(param);
            //console.log('param1:', param1);
            // create connection, insert value into table.
            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: 'add success'
                    };
                }
                jsonWrite(res, result);
                // release connection
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        // delete by id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: 'successful delete'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        // update by id
        // for simple, require name and age both.
        var param = req.body;
        if (param.name == null || param.age == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, param.id], function(err, result) {
                // use redirector for tip.
                if (result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // the second parameter could used in jade immediately.
                } else {
                    res.render('fail', {
                        result: result
                    });
                }
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        var id = +req.query.id;// convert type to int, put sql and parameter together correctly.
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
}