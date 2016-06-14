var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('updateUser');
});

// add new user
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

// query all
router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});

// query user by id
router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

// delete user
router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});

// update user
router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});

module.exports = router;
