'use strict';

var passport = require('../auth/passport');

function Basic(req, def, scopes, callback) {
    passport.authenticate('basic', {session: false}, function (err, user, info) {
        if (err) {
            callback(new Error('Authentication error'));
        } else if (!user) {
            callback(new Error('User not found'));
        } else {
            req.user = user;
            callback();
        }
    })(req, null, callback);
}

function JWT(req, def, scopes, callback) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
        if (err) {
            callback(new Error('Authentication error'));
        } else if (!user) {
            callback(new Error('User not found'));
        } else {
            req.user = user;
            callback();
        }
    })(req, null, callback);
}

module.exports = {
    Basic: Basic,
    JWT: JWT
};