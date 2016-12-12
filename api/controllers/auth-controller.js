'use strict';
var jwt = require('jsonwebtoken');

var config = require('../../config/config');
var User = require('../models/user-model');

module.exports = {
    signup: signup,
    login: login
};

// Регистрация новых пользователей
function signup(req, res) {
    var user = new User(req.swagger.params.user.value);
    user.save(function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        } else {
            res.json({message: 'OK'});
        }
    })
}

// Аутентификация пользователей по логину и паролю, выдача токена
function login(req, res) {
    if (req.isAuthenticated()) {
        res.json({
            user: req.user.username,
            token: 'JWT ' + jwt.sign({username: req.user.username}, config.jwt.secret, {expiresIn: config.jwt.expiresIn})
        });
    }
}
